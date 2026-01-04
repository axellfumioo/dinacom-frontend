export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.warn("⚠️ NEXT_PUBLIC_API_BASE_URL is not set. Using default: http://localhost:8080");
}