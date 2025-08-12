import { setUser } from "../app/features/user/userSlice";
import { AppDispatch } from "../app/store/store";

type Regis = {
  email: string;
  password: string;
  username: string;
  agreeTerms: boolean;
};

type login = {
  email: string;
  password: string;
};

type resdato = {
  message: string;
  user: string;
};

export async function registerUser(data: Regis) {
  try {
    const { ...dataToSend } = data;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) throw new Error("Error al crear la tarea");

    const dato = await res.json();

    return dato;
  } catch (error) {
    console.error("Error en el POST:", error);
  }
}

export async function loginUser(data: login, dispatch: AppDispatch) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al crear la tarea");

    const dato: resdato = await res.json();

    dispatch(setUser(dato.user));

    return dato;
  } catch (error) {
    console.error("Error en el POST:", error);
  }
}

export async function logoutUser(dispatch: AppDispatch) {
  try {
    console.log("Entro");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error cerrar session Front");

    const dato: resdato = await res.json();

    dispatch(setUser("Invited"));

    return dato;
  } catch (error) {
    console.error("Error en el POST:", error);
  }
}

export type UserProfile = {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};


export async function fetchProfile(): Promise<{ success: boolean; user?: UserProfile }> {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      credentials: "include",
    });

    if (!res.ok) {
      return { success: false};
    }

    const data = await res.json();
    return { success: true, user: data };

  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return { success: false };

  }
}
