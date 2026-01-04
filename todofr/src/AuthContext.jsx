import { createContext, useState, useEffect } from "react";
import supabase from "./supaBaseConfig";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem("sb_session");
    return storedSession ? JSON.parse(storedSession) : null;
  });

  // 🔹 Keep localStorage in sync with session
  useEffect(() => {
    if (session) {
      localStorage.setItem("sb_session", JSON.stringify(session));
    } else {
      localStorage.removeItem("sb_session");
    }
  }, [session]);

  // 🔹 Listen for Supabase auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/signin",
      },
    });

    if (error) {
      return { success: false, error };
    }

    setSession(data.session);
    return { success: true, data };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    setSession(data.session);
    return { success: true, data };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      return;
    }

    // 🔥 Explicit cleanup
    setSession(null);
    localStorage.removeItem("sb_session");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        signUpNewUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
