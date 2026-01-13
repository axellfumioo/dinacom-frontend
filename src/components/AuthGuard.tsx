"use client";

import validateToken from "@/common/lib/validateToken";
import { getCookies } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { setUserStore } from "@/common/lib/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [tokenStatus, setTokenStatus] = useState<"loading" | "false" | "true">(
    "loading"
  );

  useEffect(() => {
    const evaluate = async () => {
      const token = await getCookies();

      if (!token) {
        setTokenStatus("false");
        router.push("/auth/login");
        return;
      }

      setTokenStatus("loading");
      const userData = await validateToken(token);
      if (!userData) {
        setTokenStatus("false");
        router.push("/auth/login");
      } else {
        setUserStore({
          id: userData.user_id,
          email: userData.email,
          name: userData.full_name,
        });
        setTokenStatus("true");
      }
    };

    evaluate();
  }, [router]);

  if (tokenStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (tokenStatus === "false") {
    return null;
  }

  return <>{children}</>;
}
