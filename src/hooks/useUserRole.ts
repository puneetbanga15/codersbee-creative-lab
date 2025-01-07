import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserRole = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError);
        throw authError;
      }
      if (!user) {
        console.log("No user found");
        return null;
      }
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profileError) {
        console.error("Profile error:", profileError);
        throw profileError;
      }
      return profile?.role;
    },
    retry: false,
    meta: {
      errorHandler: () => {
        console.error("Error fetching user role");
        toast({
          title: "Error",
          description: "Failed to fetch user role. Please try logging in again.",
          variant: "destructive",
        });
        navigate("/teachers/login");
      }
    }
  });
};