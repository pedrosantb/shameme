'use client'

import React from 'react'
import { useState } from "react";
import { FaRocket, FaArrowCircleUp } from "react-icons/fa";

import { addRoastService } from "@services/api/roast";

import styles from "./style.module.css"

const AddRoast = ({ reload, setReload }) => {

  const [ goal, setGoal ] = useState("");

  const handleButton = async () => {
    if(goal === "") return

    try{
      const response = await addRoastService(goal);
    } catch (err) {
      console.error("Error creating roast:", err.message);
    }

    setReload(r => !reload);
    setGoal("");
  }


  return (
    <>
        <div className='relative w-2/3 text-4xl'>
            <FaRocket className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input type="text" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Help me with a goal..." className={` w-full ${styles.input}`} />
            <button onClick={() => {handleButton()}} className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${styles.button}`}>
              <FaArrowCircleUp />
            </button>
        </div>
    </>
  )
}

export default AddRoast;