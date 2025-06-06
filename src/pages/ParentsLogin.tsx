import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageCircle, GraduationCap, Calendar, CreditCard, Award, FileText, Download, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const ParentsLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          navigate("/parents/dashboard");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        toast.error("Error checking session");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (!profile) {
            const { error: insertError } = await supabase.from('profiles').insert({
              id: session.user.id,
              is_parent: true,
              role: 'parent'
            });

            if (insertError) throw insertError;
          }

          navigate("/parents/dashboard");
        } catch (error: any) {
          console.error("Error handling sign in:", error);
          toast.error(error.message || "Error during sign in");
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email + "@parent.codersbee.com",
        password,
      });

      if (error) throw error;
      navigate("/parents/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(error.message || "Error during login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-codersbee-vivid" />
      </div>
    );
  }

  const benefits = [
    {
      icon: MessageSquare,
      title: "Student Feedback",
      description: "Access detailed feedback and progress reports after each class"
    },
    {
      icon: Download,
      title: "Certificate Downloads",
      description: "Download and share your child's achievement certificates"
    },
    {
      icon: Calendar,
      title: "Class Scheduling",
      description: "View and manage your child's class schedule with ease"
    },
    {
      icon: CreditCard,
      title: "Easy Fee Payments",
      description: "Manage and track fee payments securely online"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor your child's achievements and milestones"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/30 to-codersbee-orange/20 flex flex-col items-center justify-center p-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center pt-20">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-codersbee-dark">
              Welcome to Your Child's
              <span className="text-codersbee-vivid block">Learning Journey</span>
            </h1>
            
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-codersbee-vivid hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="p-2 bg-codersbee-purple/20 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-codersbee-vivid" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <div className="flex">
                    <Input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-r-none"
                      placeholder="username"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      @parent.codersbee.com
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Already joined CodersBee but don't have login information?</p>
                <p>Having trouble logging in?</p>
                <Button 
                  variant="link" 
                  className="text-codersbee-vivid mt-2"
                  onClick={() => window.open('https://wa.me/919996465023', '_blank')}
                >
                  Reach out to us on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ParentsLogin;