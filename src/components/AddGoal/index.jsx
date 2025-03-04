'use client'

import React from 'react'
import { useState } from "react";
import { FaRocket, FaArrowCircleDown } from "react-icons/fa";

import styles from "./style.module.css"

const AddGoal = ({ handleButton }) => {
  
  const [ goal, setGoal ] = useState("");
  
  return (
    <>
        <div className='relative w-2/3 text-4xl'>
            <FaRocket className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input type="text" onChange={(event) => setGoal(event.target.value)} placeholder="Add a goal..." className={` w-full ${styles.input}`} />
            <button onClick={() => {
              handleButton(goal);
            }}className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${styles.button}`}>
              <FaArrowCircleDown />
              </button>
        </div>
    </>
  )
}

export default AddGoal;