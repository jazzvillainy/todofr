import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import supabase from "./supaBaseConfig";

export const AuthContext = createContext("3.,wdf");

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("there was a problem signing up");
      return { success: false, error };
    }
    return { success: true, data };
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      sessionStorage.setItem("usersession", session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      sessionStorage.setItem("username", session);
    });
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("sign in error occured:", error);
        return { success: false, error: error.message };
      }
      console.log("sign in success:", data);
      return { success: true, data };
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log("there was an error:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
// export const AuthContextProvider = ({ children }) => {
//   const [session, setsession] = useState("heyy");
//   const signUpNewUser = async (email, password) => {
//     const { data, error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       console.error("there was a problem");
//     }
//     return { success: true, data };
//   };

//   const signInUser = async ({email, password}) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
//       if(error){
//         console.error("sign in error occured:")
//         return {success:false, error:error.message}
//       }
//       console.log(data);
//       return {success:true, data}

//     } catch (error) {}
//   };

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setsession(session);
//     });
//   }, []);

//   const signOut = () => {
//     const { error } = supabase.auth.signOut();

//     if (error) {
//       console.error("knknavkvfa vhv");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ session, signInUser, signUpNewUser, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
