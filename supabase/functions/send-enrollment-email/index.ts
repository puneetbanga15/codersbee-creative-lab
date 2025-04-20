
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

// Initialize Resend with the API key
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
console.log('Starting function execution');
console.log('API Key exists:', !!RESEND_API_KEY);
console.log('API Key first 4 chars:', RESEND_API_KEY ? RESEND_API_KEY.substring(0, 4) : 'none');

const resend = new Resend(RESEND_API_KEY);

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

    // Validate API key again just before sending
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is still not configured at sending time');
      return new Response(
        JSON.stringify({ error: 'Email service configuration issue' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('Attempting to send email with Resend...');

    try {
      const emailResponse = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: ['mailsmanisha20@gmail.com', 'puneetbanga15@gmail.com'],
        subject: 'New Trial Class Booking',
        html: `
          <h1>New Trial Class Booking</h1>
          <p>A new student has booked a trial class. Details:</p>
          <ul>
            <li>WhatsApp Number: ${countryCode} ${phone}</li>
            <li>Grade: ${grade}</li>
            <li>Has Laptop: ${hasLaptop ? 'Yes' : 'No'}</li>
          </ul>
        `
      });

      console.log('Email sending complete');
      console.log('Email response:', JSON.stringify(emailResponse));

      return new Response(JSON.stringify({ success: true, response: emailResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (emailError) {
      console.error('Email sending error caught:', emailError);
      console.error('Email error type:', typeof emailError);
      console.error('Email error properties:', Object.keys(emailError));
      console.error('Email error details:', emailError instanceof Error ? emailError.message : String(emailError));
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email', 
          details: emailError instanceof Error ? emailError.message : String(emailError) 
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
