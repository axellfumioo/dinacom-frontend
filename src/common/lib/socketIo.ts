import { SocketBaseURL } from "../constants/api_base_url"
import { getCookies } from "@/lib/cookie"
import { useEffect, useState } from "react"
import io from "socket.io-client"


export function useSocket() {
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)

    useEffect(() => {
        let s: SocketIOClient.Socket | null = null

        async function connect() {
            const token = await getCookies()
            if (!token) return

            s = io(SocketBaseURL || "", {
                query: { token },
                transports: ["websocket"],
            })

            setSocket(s)
        }

        connect()
    }, [])

    return socket
}