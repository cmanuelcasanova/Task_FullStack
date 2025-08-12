"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "@/services/Userservices";

type UserProfile = {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

 useEffect(() => {
    const loadProfile = async () => {
      const { success, user } = await fetchProfile();

      if (!success || !user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setLoading(false);
    };

    loadProfile();
  }, [router]);

 

  if (loading) return <div className="text-center mt-10">Cargando perfil...</div>;
  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6 pt-6 pb-6 mt-40 border rounded-md bg-[#0b1c2c] text-[#8092a1] bg-[radial-gradient(circle_at_center,_#041424,_#051320,_#080d13)] border-[#1b2936] hover:border-[#677483] transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
      <p><strong>Nombre de usuario:</strong> <span className="text-white">{user.username}</span></p>
      <p><strong>Email:</strong> <span className="text-white">{user.email}</span></p>
      <p><strong>Creado el:</strong> <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span></p>
      <p><strong>Última modificación:</strong> <span className="text-white">{new Date(user.updatedAt).toLocaleDateString()}</span></p>
    </div>
  );
}
