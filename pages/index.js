import React from "react";
import Navbar from "../components/Navbar";
import Ride from "../components/Ride";
import { UserProvider } from "../context/UserContext";

const index = ({ user, rides }) => {
  return (
    <>
      <UserProvider value={{ user, rides }}>
        <div>
          <Navbar />
        </div>
        <Ride />
      </UserProvider>
    </>
  );
};

export const getServerSideProps = async () => {
  const [userData, ridesData] = await Promise.all([
    fetch("https://assessment.api.vweb.app/user"),
    fetch("https://assessment.api.vweb.app/rides"),
  ]);
  const [user, rides] = await Promise.all([userData.json(), ridesData.json()]);
  return { props: { user, rides } };
};

export default index;
