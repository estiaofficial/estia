import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useUser } from "../context";
import { User } from "../types/user";
import { Navbar } from "../components/navbar/Navbar";

export const ProfilePage: React.FC = () => {
  const { username } = useParams();
  const { searchUser } = useUser();
  const { session } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User>();

  const fetchUser = async () => {
    try {
      const userData = await searchUser(username as string);
      setProfile(userData as User);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />

      {profile && session?.user.id !== profile?.id && (
        <>
          <div>
            <p>Welcome to {profile.username}`s profile</p>
          </div>
        </>
      )}

      {session?.user.id === profile?.id && (
        <>
          <div>
            <p>Welcome back, {profile?.username}</p>
            <p>Your id is: {profile?.id}</p>
            <p>Your email is: {profile?.email}</p>
          </div>
        </>
      )}

      {loading && (
        <>
            <div>
                loading...
            </div>
        </>
      )}

      {!profile && !loading && (
        <>
          <div>
            <p>This account does not exist</p>
          </div>
        </>
      )}
    </>
  );
};