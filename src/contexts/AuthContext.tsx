import React, { useState, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logOutUser: () => void;
  username: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  return useContext(AuthContext)!;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const authRelatedData = localStorage.getItem("authTokens");
  const initialAuthToken = authRelatedData ? JSON.parse(authRelatedData) : null;
  const initialUser = initialAuthToken
    ? jwt_decode<{ username: string }>(initialAuthToken.access).username
    : null;

  const [authToken, setAuthToken] = useState<string | null>(initialAuthToken);
  const [user, setUser] = useState<string | null>(initialUser);

  const loginUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      const accessToken = data.access;
      setAuthToken(accessToken);
      setUser(jwt_decode<{ username: string }>(accessToken).username);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/posts");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  const logOutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    loginUser,
    logOutUser,
    username: user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
