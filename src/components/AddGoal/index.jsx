'use client'

import React from 'react'
import { useState } from "react";
import { FaRocket, FaArrowCircleDown } from "react-icons/fa";

import { addGoalService } from "@services/api/goals";

import styles from "./style.module.css"

const AddGoal = ({ reload, setReload }) => {

  const [ goal, setGoal ] = useState("");

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


  return (
    <>
        <div className='relative w-2/3 text-4xl'>
            <FaRocket className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input type="text" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Add a goal..." className={` w-full ${styles.input}`} />
            <button onClick={() => {handleButton()}} className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${styles.button}`}>
              <FaArrowCircleDown />
              </button>
        </div>
    </>
  )
}

export default AddGoal;