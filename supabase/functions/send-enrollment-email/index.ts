
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

    // Log the enrollment request details for debugging
    console.log(`Enrollment request received for ${email}:`, {
      grade,
      hasLaptop,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would send the actual email using a service like Resend
    // For now, we'll simulate the email sending process
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Enrollment email request processed successfully' 
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
        error: 'Could not process enrollment email request',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
