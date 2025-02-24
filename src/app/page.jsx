'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import { newRoast } from "../services/api/roast";
import AddGoal from "@components/AddGoal"
import Card from "../components/Card";

export default function Home() {
  
  const [ goal, setGoal ] = useState("");
  const [ roast, setRoast ] = useState();

  const tasks = [
    { id: 1, title: "Go to the gym", type: "Daily" },
    { id: 2, title: "Meal prep", type: "Weekly. Mon, Tue..." },
    { id: 3, title: "Cook", type: "Daily" },
  ];


  useEffect(() => {

    const fetchLLM = async () => {

      const response = await newRoast(goal);

      setRoast(r => response.response);
    }

    fetchLLM();


  }, [goal])

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
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    title={task.title}
                    type={task.type}
                    onEdit={() => handleEdit(task.id)}
                    onPause={() => handlePause(task.id)}
                  />
                ))}
              </div>
            </div>

  
    </>
  );
}
