import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const UserHome = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const [totalPoints, setTotalPoints] = useState(0); // useLocation hook to access state from navigate

  // Access the state from the location object
  const usnFromState = location.state && location.state.usn;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/get-user/${usnFromState}`
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTotalPoints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/get-total-points/${usnFromState}`
        );
        setTotalPoints(response.data.totalPoints);
      } catch (error) {
        console.error("Error fetching total points:", error);
      }
    };

    fetchTotalPoints();
    fetchUserData();
  }, [usnFromState]);

  return (
    <div
      style={{ overflow: "hidden" }}
      className="min-h-screen bg-black flex flex-col top-20 justify-start items-center py-16"
    >
      <h1 className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-8">
        Welcome back! {userData.fname} {userData.lname}
      </h1>
      <div className="flex flex-col items-center text-white font-bold">
        <p className="text-white font-bold text-xl mb-2">USN: {usnFromState}</p>
        <p className="mb-8 text-white font-bold text-xl">
          Branch: {userData.branch}
        </p>
        <p className="mb-8 text-white font-bold text-xl">Total Points: {totalPoints}</p>
      </div>
      <div className="mt-40 flex gap-20">
        <Link to="/cocurrecular">
          <Card className="w-96 h-96 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
            <CardHeader>
              <CardContent className="mt-36 text-white text-center font-bold text-lg flex justify-center items-center h-full   ">
                Co-curricular activities
              </CardContent>
            </CardHeader>
            <CardFooter className="flex justify-center items-center mt-4"></CardFooter>
          </Card>
        </Link>
        <Link to="/activity">
          <Card className="w-96 h-96 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <CardHeader>
              <CardTitle className="mt-36 text-white text-center font-bold text-lg flex justify-center items-center h-full ">
                Activities
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-center items-center mt-4"></CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
