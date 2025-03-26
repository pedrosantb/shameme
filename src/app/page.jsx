'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import AddGoal from "@components/AddGoal"
import Card from "@components/Card";

import { getAllGoalsService } from "@services/api/goals";
import { addUserSevice } from "@services/api/user";


export default function Home() {
  
  const [ goalsList, setGoalsList ] = useState([]);

  const [ reload, setReload ] = useState(1);

  const { isLoaded, user } = useUser();

  // AddUser on loading (Needs to be reworked to prevent unecessaries requests)
  useEffect(() => {
    if (!isLoaded || !user) return;

    const addUser = async () => {
      try {
        const response = await addUserSevice(user);
      } catch (err) {
        console.error("Error creating user:", err.message);
      }
    };
    addUser();
  }, [isLoaded, user]);


  // Reloads goal list
  useEffect(() => {
    const fetchGoals = async () => {
      const response = await getAllGoalsService();
      // console.log(response);
      setGoalsList(response);
    } 

    fetchGoals();
    console.log(goalsList);
  }, [reload])


  return (
    <>
            <div className="w-full h-screen flex flex-col items-center my-12">
              
              <AddGoal reload={reload} setReload={setReload}/>
              <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        
                {goalsList.length > 0 ? (
                  goalsList.map((goal) => (
                    <Card
                      key={goal.id}
                      goal={goal}
                    />
                  ))
                ) : (
                  <p></p>
                )}

              </div>

            </div>
    </>
  );
}
