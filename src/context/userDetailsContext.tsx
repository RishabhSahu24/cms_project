import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData } from "../components/types";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "@firebase/firestore";

const UserContext = createContext<UserData | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;
            setUserDetails(userData);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={userDetails}>
      {!loading && children}
    </UserContext.Provider>
  );
};
