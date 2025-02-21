import React, { Children, useContext } from "react";
import { createContext, useEffect, useState } from "react";
import supabase from "./supaBaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setsession] = useState("heyy");
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("there was a problem");
    }
    return { success: true, data };
  };

  const signInUser = async ({email, password}) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if(error){
        console.error("sign in error occured:")
        return {success:false, error:error.message}
      }
      console.log(data);
      return {success:true, data}
      
    } catch (error) {}
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setsession(session);
    });
  }, []);

  const signOut = () => {
    const { error } = supabase.auth.signOut();

    if (error) {
      console.error("knknavkvfa vhv");
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser, signUpNewUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
