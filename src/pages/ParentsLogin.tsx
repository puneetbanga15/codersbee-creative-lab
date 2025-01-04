import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageCircle, GraduationCap, Link, ClipboardList } from "lucide-react";

const ParentsLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/parents/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/30 to-codersbee-orange/20 flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Benefits Section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-codersbee-dark">
            Welcome to Your Child's
            <span className="text-codersbee-vivid block">Learning Journey</span>
          </h1>
          
          <div className="grid gap-4">
            <Card className="border-l-4 border-l-codersbee-vivid hover:shadow-lg transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="p-2 bg-codersbee-purple/20 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-codersbee-vivid" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Track Learning Progress</h3>
                  <p className="text-gray-600">Monitor your child's achievements and growth in real-time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-codersbee-vivid hover:shadow-lg transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="p-2 bg-codersbee-purple/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-codersbee-vivid" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Direct Teacher Communication</h3>
                  <p className="text-gray-600">Share feedback and stay connected with teachers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-codersbee-vivid hover:shadow-lg transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="p-2 bg-codersbee-purple/20 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-codersbee-vivid" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Homework & Assignments</h3>
                  <p className="text-gray-600">Access and track assignments and learning materials</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-codersbee-vivid hover:shadow-lg transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="p-2 bg-codersbee-purple/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-codersbee-vivid" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Advanced Learning Resources</h3>
                  <p className="text-gray-600">Access curated videos and advanced courses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Section */}
        <Card className="p-8 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Parent Login</CardTitle>
            <p className="text-center text-gray-600">
              Access your child's learning dashboard
            </p>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: {
                    background: 'rgb(139, 92, 246)',
                    color: 'white',
                  },
                  anchor: {
                    color: 'rgb(139, 92, 246)',
                  },
                },
              }}
              theme="light"
              providers={[]}
              view="sign_in"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentsLogin;