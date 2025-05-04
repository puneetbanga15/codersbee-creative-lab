
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData = await req.json();
    const { email, grade, hasLaptop } = requestData as EnrollmentEmailRequest;

    // For now, just log the enrollment request and return success
    // In a real implementation, you would send the actual email here
    console.log(`Enrollment request received for ${email}:`, {
      grade,
      hasLaptop,
      timestamp: new Date().toISOString(),
    });

    // This is where you would integrate with your email service
    // For example: Resend, SendGrid, etc.

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Enrollment email request received' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Enrollment email error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Could not process enrollment email request' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
