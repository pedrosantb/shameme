'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import AddGoal from "@components/AddGoal"
import Card from "@components/Card";

import { getAllGoals } from "@services/api/goals";
import { addUserSevice } from "@services/api/user";
import { addGoalService } from "@services/api/goals";
import { toggleGoalService } from "../services/api/goals";

export default function Home() {
  
  const [ goal, setGoal ] = useState("");
  const [ roast, setRoast ] = useState();
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


  useEffect(() => {
    const fetchGoals = async () => {
      const response = await getAllGoals();
      setGoalsList(goals => response);
    } 

    fetchGoals();
  }, [reload])


  const handleButton = async () => {
    if(goal === "") return

    try{
      const response = await addGoalService(goal);
    } catch (err) {
      console.error("Error creating user:", err.message);
    }

    setReload(r => !reload);
    setGoal("");
  }


  const handleEdit = (id) => {
    console.log("Editing task:", id);
  };

  const handlePause = async (id, status) => {
    try{
      const response = await toggleGoalService(id ,status);
    } catch (err) {
      console.error("Error creating user:", err.message);
    }
    setReload(r => !reload);
    
  };

  return (
    <> 
            <div className="w-full h-screen flex flex-col items-center my-12">
              <AddGoal handleButton={handleButton} goal={goal} setGoal={setGoal}/>
              <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {goalsList.length > 0 ? (
                goalsList.map((goal) => (
                  <Card
                    key={goal.id}
                    title={goal.title}
                    type={goal.recurrence}
                    status={goal.status}
                    onEdit={() => handleEdit(goal.id)}
                    onPause={() => handlePause(goal.id, goal.status)}
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
