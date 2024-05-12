import React, { useEffect, useState } from "react";
import { UserData } from "../components/types";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../context/firebase";
import Dashboard from "../components/Dashboard";
import LoadingPage from "./LoadingPage";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const DashboardPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUserDetails(userData);
          setLoading(false); // Set loading to false after user details are fetched
        } else {
          console.log("Problem");
          setLoading(false); // Set loading to false even if there's a problem
        }
      } else {
        setLoading(false); // Set loading to false if there's no user
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("Logout");
    } catch (error: any) {
      console.log("Error ", error.message);
    }
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar userDetails={userDetails} />
          <Sidebar handleLogout={handleLogout} />
          <Dashboard />
        </>
      )}
    </>
  );
};

export default DashboardPage;
