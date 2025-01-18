import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState("@admin.codersbee.com");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateInputs = () => {
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your username",
      });
      return false;
    }
    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your password",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsLoading(true);

    try {
      // Clean the email input and concatenate with domain
      const cleanEmail = email.trim().toLowerCase();
      const fullEmail = cleanEmail.includes('@') ? cleanEmail : cleanEmail + domain;

      console.log('Attempting login with email:', fullEmail); // Debug log

      const { data, error } = await supabase.auth.signInWithPassword({
        email: fullEmail,
        password: password.trim(),
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message === "Invalid login credentials" 
            ? "Invalid username or password. Please check your credentials and try again."
            : error.message,
        });
        return;
      }

      if (data?.session) {
        console.log('Login successful, redirecting...'); // Debug log
        navigate("/teachers/dashboard");
      } else {
        console.error('No session after successful login'); // Debug log
        toast({
          variant: "destructive",
          title: "Login Error",
          description: "Failed to create session. Please try again.",
        });
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Staff Login</h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Please enter your credentials.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md"
                    placeholder="username"
                    disabled={isLoading}
                  />
                  <Select 
                    value={domain} 
                    onValueChange={setDomain}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="@admin.codersbee.com">@admin.codersbee.com</SelectItem>
                      <SelectItem value="@teacher.codersbee.com">@teacher.codersbee.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherLogin;