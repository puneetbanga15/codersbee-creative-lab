
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageSquare } from "lucide-react";

interface ConnectionErrorProps {
  visible: boolean;
}

export const ConnectionError = ({ visible }: ConnectionErrorProps) => {
  if (!visible) return null;
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800">Connection Issue</h3>
          <p className="text-sm text-amber-700 mt-1">
            Buzzy is experiencing connection issues but can still provide basic information. For detailed answers, please reach out via WhatsApp.
          </p>
          <Button 
            size="sm" 
            variant="outline" 
            className="mt-2 bg-green-500 hover:bg-green-600 text-white border-0"
            onClick={() => window.open("https://wa.me/919996465023", "_blank")}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Contact on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
