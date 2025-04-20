
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
        JSON.stringify({ error: 'Email service not configured properly', friendly: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 // Return 200 even for configuration issues to allow booking to proceed
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
    
    // Attempt to send emails, but don't fail the booking if emails fail
    let emailResults = { success: false, message: 'Email sending bypassed' };
    
    try {
      // Try to send to mailsmanisha20@gmail.com
      console.log('Attempting to send email to recipient 1: mailsmanisha20@gmail.com');
      const email1Response = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: ['mailsmanisha20@gmail.com'],
        subject: 'New Trial Class Booking',
        html: emailHtml
      });
      
      console.log('Email 1 sending response:', JSON.stringify(email1Response));
      
      // Small delay between sends
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to send to puneetbanga15@gmail.com
      console.log('Attempting to send email to recipient 2: puneetbanga15@gmail.com');
      const email2Response = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: ['puneetbanga15@gmail.com'],
        subject: 'New Trial Class Booking',
        html: emailHtml
      });
      
      console.log('Email 2 sending response:', JSON.stringify(email2Response));
      
      emailResults = {
        success: true,
        message: 'Notification emails sent successfully'
      };
    } catch (emailError) {
      console.error('Email sending error caught:', emailError);
      console.error('Email error type:', typeof emailError);
      console.error('Email error message:', emailError instanceof Error ? emailError.message : String(emailError));
      
      emailResults = {
        success: false,
        message: 'Could not send notification emails, but booking was recorded',
        // Don't include technical error details in the response
      };
    }

    // Always return success for the overall operation
    return new Response(JSON.stringify({ 
      success: true,
      booking: { phone, grade, hasLaptop, countryCode },
      notification: emailResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Top-level error caught:', error);
    console.error('Error type:', typeof error);
    
    // Return a user-friendly error without technical details
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'We received your booking information but had an issue processing it.',
        friendly: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 even for errors to let frontend handle gracefully
      }
    );
  }
});
