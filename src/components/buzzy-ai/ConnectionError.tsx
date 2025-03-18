import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageSquare, RefreshCcw } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

interface ConnectionErrorProps {
  visible: boolean;
  onRetry?: () => void;
}

export const ConnectionError = ({ visible, onRetry }: ConnectionErrorProps) => {
  const supabase = useSupabaseClient();
  
  if (!visible) return null;
  
  const handleRetry = async () => {
    if (onRetry) {
      onRetry();
      return;
    }
    
    // Try to manually test the connection
    toast.loading("Testing connection...");
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-buzzy', {
        body: { 
          message: "test connection",
          previousMessages: []
        }
      });
      
      if (error) {
        toast.error("Still having connection issues. Please try again later.");
      } else {
        toast.success("Connection restored! You can now chat with Buzzy.");
      }
    } catch (err) {
      toast.error("Connection test failed. Please try again later.");
    }
  };
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">Connection Issue</h3>
          <p className="text-sm text-amber-700 mt-1">
            Buzzy is experiencing connection issues with the Perplexity API but can still provide basic information. For detailed answers, please try again later or reach out via WhatsApp.
          </p>
          <div className="flex gap-2 mt-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-green-500 hover:bg-green-600 text-white border-0"
              onClick={() => window.open("https://wa.me/919996465023", "_blank")}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Contact on WhatsApp
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={handleRetry}
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
