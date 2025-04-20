
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

// Initialize Resend with the API key
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
console.log('Starting function execution');
console.log('API Key exists:', !!RESEND_API_KEY);
console.log('API Key length:', RESEND_API_KEY ? RESEND_API_KEY.length : 0);
console.log('API Key first 4 chars:', RESEND_API_KEY ? RESEND_API_KEY.substring(0, 4) : 'none');

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is not set!");
}

// Create Resend instance only if API key exists
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EnrollmentEmailRequest {
  phone: string
  grade: string
  hasLaptop: boolean
  countryCode: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Request received:', req.method);
    console.log('Request headers:', JSON.stringify(Object.fromEntries(req.headers.entries())));
    
    // Parse the request body
    const requestData = await req.json();
    console.log('Raw request data received:', JSON.stringify(requestData));
    
    const { phone, grade, hasLaptop, countryCode } = requestData as EnrollmentEmailRequest;
    
    console.log('Parsed request data:', { 
      phone, 
      grade, 
      hasLaptop, 
      countryCode 
    });

    // Validate required fields
    if (!phone || !grade) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Validate API key and resend instance
    if (!RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Email service configuration issue - API key not set' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('Attempting to send email with Resend...');
    
    // Build the email HTML
    const emailHtml = `
      <h1>New Trial Class Booking</h1>
      <p>A new student has booked a trial class. Details:</p>
      <ul>
        <li>WhatsApp Number: ${countryCode} ${phone}</li>
        <li>Grade: ${grade}</li>
        <li>Has Laptop: ${hasLaptop ? 'Yes' : 'No'}</li>
      </ul>
    `;
    
    console.log('Email HTML prepared:', emailHtml);
    
    // Use individual sends instead of a single send with multiple recipients
    try {
      console.log('Attempting to send email to recipient 1: mailsmanisha20@gmail.com');
      const email1Response = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: ['mailsmanisha20@gmail.com'],
        subject: 'New Trial Class Booking',
        html: emailHtml
      });
      
      console.log('Email 1 sending response:', JSON.stringify(email1Response));
      
      // Small delay between sends to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Attempting to send email to recipient 2: puneetbanga15@gmail.com');
      const email2Response = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: ['puneetbanga15@gmail.com'],
        subject: 'New Trial Class Booking',
        html: emailHtml
      });
      
      console.log('Email 2 sending response:', JSON.stringify(email2Response));
      
      // Check both responses
      const responses = {
        email1: email1Response,
        email2: email2Response
      };

      // Check if either response contains an error
      if (('error' in email1Response && email1Response.error) || 
          ('error' in email2Response && email2Response.error)) {
        throw new Error(`Resend API errors: ${JSON.stringify(responses)}`);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        responses 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (emailError) {
      console.error('Email sending error caught:', emailError);
      console.error('Email error type:', typeof emailError);
      console.error('Email error properties:', Object.keys(emailError));
      console.error('Email error details:', emailError instanceof Error ? emailError.message : String(emailError));
      
      // Detailed error information
      const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
      let userFriendlyError = 'Failed to send email';
      
      if (errorMessage.includes('domain is invalid')) {
        userFriendlyError = 'The sender domain is not verified in Resend. Please verify your domain in Resend or use the default sender format correctly.';
      } else if (errorMessage.includes('recipient')) {
        userFriendlyError = 'One or more recipients are not verified. With the free Resend account and default sender, you need to verify recipient emails.';
      } else if (errorMessage.includes('rate limit')) {
        userFriendlyError = 'You have exceeded the Resend rate limit. Please try again later.';
      } else if (errorMessage.includes('verification')) {
        userFriendlyError = 'Email verification issue. Please ensure all recipient emails are verified in your Resend account.';
      }
      
      return new Response(
        JSON.stringify({ 
          error: userFriendlyError, 
          details: errorMessage,
          message: "See logs for more details"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

  } catch (error) {
    console.error('Top-level error caught:', error);
    console.error('Error type:', typeof error);
    console.error('Error properties:', Object.keys(error));
    
    return new Response(
      JSON.stringify({ 
        error: 'Unexpected error', 
        details: error instanceof Error ? error.message : String(error) 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
