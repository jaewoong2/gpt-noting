"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ExtensionGoogleAuth = {
  status: string;
  response: {
    access_token: string;
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    is_public: boolean;
    name: string;
    picture: string;
    verified_email: boolean;
  };
};

type AuthContextType = {
  avatar: string;
  userName: string;
  accessToken: string;
  email: string;
  isPublic: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Needs Comment Context Provider");
  }

  return context;
};

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const value = useMemo((): AuthContextType => {
    return { accessToken, avatar, email, isPublic, userName };
  }, [accessToken, avatar, email, isPublic, userName]);

  useEffect(() => {
    chrome?.runtime?.sendMessage(
      process.env.NEXT_PUBLIC_GOOGLE_EXTENSION_ID,
      {
        type: "GET_USER_INFO",
      },
      ({ status, response }: ExtensionGoogleAuth) => {
        if (status === "success") {
          setAvatar(response.picture);
          setUserName(response.name);
          setEmail(response.email);
          setAccessToken(response.access_token);
          setIsPublic(response.is_public);
        }
      }
    );
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
