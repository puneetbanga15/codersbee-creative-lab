
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import * as twilio from "npm:twilio";

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WhatsAppNotificationRequest {
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

  // Validate environment variables
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.error("Missing Twilio configuration");
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'WhatsApp notification service not configured' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }

  try {
    const client = twilio.default(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    // Parse the request body
    const requestData = await req.json();
    const { phone, grade, hasLaptop, countryCode } = requestData as WhatsAppNotificationRequest;
    
    // Construct full phone number
    const fullPhoneNumber = `${countryCode}${phone}`;
    
    // Construct WhatsApp message
    const messageBody = `New Trial Class Booking:
- WhatsApp Number: ${fullPhoneNumber}
- Grade: ${grade}
- Has Laptop: ${hasLaptop ? 'Yes' : 'No'}`;

    // Send WhatsApp message
    const message = await client.messages.create({
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      body: messageBody,
      to: `whatsapp:${fullPhoneNumber}`
    });

    console.log('WhatsApp message sent successfully:', message.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'WhatsApp notification sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Could not send WhatsApp notification' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
