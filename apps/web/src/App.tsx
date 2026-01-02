import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from "@repo/ui";
import { useSupabase } from "./hooks/useSupabase";

function App() {
  const [email, setEmail] = useState("");
  const { supabase, isConfigured } = useSupabase();

  const handleSignIn = async () => {
    if (!supabase) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>React + Supabase Monorepo</CardTitle>
        </CardHeader>
        <CardContent>
          {!isConfigured && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in your .env file.
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleSignIn}
              className="w-full"
              disabled={!email || !isConfigured}
            >
              Sign in with Magic Link
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Monorepo Structure
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <code className="text-blue-600">apps/web</code> - This React app
              </li>
              <li>
                <code className="text-blue-600">packages/ui</code> - Shared UI
                components
              </li>
              <li>
                <code className="text-blue-600">packages/shared</code> -
                Supabase client & types
              </li>
              <li>
                <code className="text-blue-600">supabase/</code> - Supabase CLI
                config & migrations
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
