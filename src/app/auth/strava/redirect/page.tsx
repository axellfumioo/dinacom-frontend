"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity } from "lucide-react";

export default function StravaRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid");

  useEffect(() => {
    if (userid) {
      // Here you would typically make an API call to your backend to initiate Strava OAuth
      // For now, we'll simulate by redirecting to a Strava auth URL
      // Replace with actual Strava OAuth URL from your backend
      const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=activity:read_all&state=${userid}`;
      window.location.href = stravaAuthUrl;
    } else {
      // If no userid, redirect to login
      router.push("/auth/login");
    }
  }, [userid, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-orange-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Menghubungkan dengan Strava
        </h2>
        <p className="text-gray-600">
          Mengalihkan ke Strava untuk otorisasi...
        </p>
      </div>
    </div>
  );
}