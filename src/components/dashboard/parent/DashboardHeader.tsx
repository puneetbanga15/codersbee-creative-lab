import { Button } from "@/components/ui/button";
import { LogOut, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/parents/login");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919996465023', '_blank');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Welcome to Parent Dashboard</h1>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={handleWhatsAppClick}
        >
          <Phone className="w-4 h-4 mr-2" />
          Contact on WhatsApp
        </Button>
        <Button
          variant="outline"
          className="text-red-500 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};