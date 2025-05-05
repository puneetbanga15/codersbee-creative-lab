
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with the API key
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
console.log('Starting email function execution');

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is not set!");
}

// Create Resend instance only if API key exists
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EnrollmentEmailRequest {
  email: string;
  grade: string;
  hasLaptop: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Email function request received:', req.method);
    
    // Parse the request body
    const requestData = await req.json();
    console.log('Raw request data received:', JSON.stringify(requestData));
    
    const { email, grade, hasLaptop } = requestData as EnrollmentEmailRequest;
    
    console.log('Parsed request data:', { 
      email, 
      grade, 
      hasLaptop
    });

    // Validate required fields
    if (!email || !grade) {
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
    
    // Build the email HTML for the confirmation to the user
    const userEmailHtml = `
      <h1>Thank You for Booking a Trial Class with CodersBee!</h1>
      <p>Dear Parent,</p>
      <p>We're excited to have your child join us for a free trial class. Here's what you've shared with us:</p>
      <ul>
        <li>Child's Grade: ${grade}</li>
        <li>Has Laptop: ${hasLaptop ? 'Yes' : 'No'}</li>
      </ul>
      <p>The next step is to select a convenient time slot for your trial class. Please check your browser for the Calendly scheduling page that opened, or <a href="https://calendly.com/codersbee/class-slot">click here</a> to schedule your class.</p>
      <p>If you have any questions, feel free to reach out to us.</p>
      <p>Warm regards,<br>The CodersBee Team</p>
    `;
    
    // Build the notification email HTML for the admin
    const adminEmailHtml = `
      <h1>New Trial Class Booking</h1>
      <p>A new student has booked a trial class. Details:</p>
      <ul>
        <li>Email: ${email}</li>
        <li>Grade: ${grade}</li>
        <li>Has Laptop: ${hasLaptop ? 'Yes' : 'No'}</li>
      </ul>
    `;
    
    console.log('Email HTML prepared');
    
    // Attempt to send emails
    try {
      // Send confirmation email to the user
      console.log('Attempting to send confirmation email to user:', email);
      const userEmailResponse = await resend.emails.send({
        from: 'CodersBee <onboarding@resend.dev>',
        to: [email],
        subject: 'Your CodersBee Trial Class Booking',
        html: userEmailHtml
      });
      
      console.log('User email response:', JSON.stringify(userEmailResponse));
      
      // Small delay between sends
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send notification emails to admins
      console.log('Attempting to send email to admins');
      const adminEmails = ['mailsmanisha20@gmail.com', 'puneetbanga15@gmail.com'];
      
      for (const adminEmail of adminEmails) {
        const adminEmailResponse = await resend.emails.send({
          from: 'CodersBee <onboarding@resend.dev>',
          to: [adminEmail],
          subject: 'New Trial Class Booking',
          html: adminEmailHtml
        });
        
        console.log(`Admin email to ${adminEmail} response:`, JSON.stringify(adminEmailResponse));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Return success response
      return new Response(JSON.stringify({ 
        success: true,
        email: email,
        notification: {
          success: true,
          message: 'Notification emails sent successfully'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Return partial success (booking recorded but email failed)
      return new Response(JSON.stringify({ 
        success: true,
        email: email,
        notification: {
          success: false,
          message: 'Could not send notification emails, but booking was recorded',
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

  } catch (error) {
    console.error('Top-level error caught:', error);
    
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
