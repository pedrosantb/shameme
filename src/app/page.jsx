'use client'

import Image from "next/image";
import { use, useEffect, useState } from "react";

import { newRoast } from "../services/api/roast";

export default function Home() {
  
  const [ goal, setGoal ] = useState("");
  const [ roast, setRoast ] = useState();
  const [ button, setButton ] = useState(0);
  
  useEffect(() => {

    const fetchLLM = async () => {

      const response = await newRoast(goal);

      setRoast(r => response.response);
    }

    fetchLLM();
  }, [button])

  const handleButton = () => {
    setButton(b => b + 1)
  }

  const handleInput = event => {
    setGoal(event.target.value);
  };
  
  return (
    <> 
            <div className="w-2/3 m-16">
              {roast && <p>{roast}</p>}
            </div>

            <div className="w-4/5 flex justify-center align-center gap-2">
              <input className="p-2" onChange={handleInput} placeholder="Enter your next goal"/>
              <button className="p-2" onClick={handleButton}>Roast Me! </button>
            </div>

  
    </>
  );
}
