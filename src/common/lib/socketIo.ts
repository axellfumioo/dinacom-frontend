import { io, } from "socket.io-client"
import { ApiBaseURL } from "../constants/api_base_url"
import { getCookies } from "@/lib/cookie"

let socket: ReturnType<typeof io> | null = null;

export async function connectSocket() {
  if (socket) return socket;

  const token = await getCookies();
  if (!token) return null;

  socket = io(ApiBaseURL, {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
}