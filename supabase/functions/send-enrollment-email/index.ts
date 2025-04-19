
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

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
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phone, grade, hasLaptop, countryCode } = await req.json() as EnrollmentEmailRequest;

    // Send email to multiple team members about new enrollment
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

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
