import { useEffect, useState } from "react";
import validateToken from "@/common/lib/validateToken";
import { getCookies } from "@/lib/cookie";
import { CreateUserDto } from "@/common/dto/userDto";

export const useCurrentUser = () => {
  const [user, setUser] = useState<CreateUserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getCookies();
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
        const userData = await validateToken(token);
        if (userData) {
          setUser({ email: userData.email, name: userData.full_name, password: "", phone_number: userData.phone_number || "" });
        } else {
          setError('Invalid token');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
