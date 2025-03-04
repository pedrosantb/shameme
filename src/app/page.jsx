'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import AddGoal from "@components/AddGoal"
import Card from "@components/Card";

import { getAllGoals } from "@services/api/goals";
import { addUserSevice } from "@services/api/user";

export default function Home() {
  
  const [ goal, setGoal ] = useState("");
  const [ roast, setRoast ] = useState();
  const [ goalsList, setGoalsList ] = useState([]);

  const { isLoaded, user } = useUser();

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







  useEffect(() => {
    const fetchGoals = async () => {
      const response = await getAllGoals();
      setGoalsList(goals => response);
    } 

    fetchGoals()
  }, [])


  const handleButton = (goal) => {
    setGoal(goal);
  }

  const handleEdit = (id) => {
    console.log("Editing task:", id);
  };

  const handlePause = (id) => {
    console.log("Pausing task:", id);
  };

  return (
    <> 
            <div className="w-full h-screen flex flex-col items-center my-12">
              <AddGoal handleButton={handleButton} />
              <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {goalsList.length > 0 ? (
                goalsList.map((goal) => (
                  <Card
                    key={goal.id}
                    title={goal.title}
                    type={goal.recurrence}
                    onEdit={() => handleEdit(goal.id)}
                    onPause={() => handlePause(goal.id)}
                  />
                ))
              ) : (
                <p>No goals available.</p>
              )}

              </div>
            </div>

  
    </>
  );
}
