"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export function AuthButton() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClick = () => {
    setIsSignedIn(!isSignedIn);
    isSignedIn ? handleSignOut() : handleSignIn();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
}
