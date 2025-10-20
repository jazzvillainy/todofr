import { createContext, useState } from "react";
import supabase from "./supaBaseConfig";
import PropTypes from "prop-types";

export const AuthContext = createContext("3.,wdf");

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:5173/signin",
      },
    });
    if (error) {
      // console.log(error);
      return { success: false, error: error };
    }

    setSession(data?.session);
    return { success: true, data };
  };

  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session);
  //   if (event === "INITIAL_SESSION") {
  //     console.log(event, session);
  //     // handle initial session
  //   } else if (event === "SIGNED_IN") {
  //     console.log(event, session);
  //     // handle sign in event
  //   } else if (event === "SIGNED_OUT") {
  //     console.log(event, session);
  //     // handle sign out event
  //   } else if (event === "PASSWORD_RECOVERY") {
  //     console.log(event, session);
  //     // handle password recovery event
  //   } else if (event === "TOKEN_REFRESHED") {
  //     // handle token refreshed event
  //   } else if (event === "USER_UPDATED") {
  //     // handle user updated event
  //   }
  // });

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
      setSession(data?.session);
      // console.log("sign in success:", data);
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
    <AuthContext.Provider
      value={{ setSession, session, signUpNewUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
