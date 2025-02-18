'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import { newRoast } from "../services/api/roast";
import AddGoal from "@components/AddGoal"

export default function Home() {
  
  const [ goal, setGoal ] = useState("");
  const [ roast, setRoast ] = useState();

  
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


  return (
    <> 
            <div className="w-full h-screen flex flex-col items-center justify-center m-16">

              {roast && <p className="mb-10 w-2/3 text-4xl">{roast}</p>}
              <AddGoal handleButton={handleButton} />
              
            </div>

  
    </>
  );
}
