import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!session) {
          console.log("No active session found, redirecting to login");
          navigate("/teachers/login");
          return;
        }
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/teachers/login");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/teachers/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};