'use client'

import React from 'react'
import { useState } from "react";

import { toggleGoalService } from "@services/api/goals";

import ModalUpdate from "@components/ModalUpdate";
import styles from "./style.module.css"


const Card = (goal) => {

  const { title, type, status } = goal

  const [open, setOpen] = useState(false);

  const handlePause = async (id, status) => {
    try{
      const response = await toggleGoalService(id ,status);
    } catch (err) {
      console.error("Error creating user:", err.message);
    }
    setReload(r => !reload);
  };

  const handleEdit = (key) => {
    setOpen(true);
  };

  return (
    <>
      <ModalUpdate open={open} setOpen={setOpen} goal={goal} />
      <div className={`p-4 ${styles.card}` }>
          <h2 className="text-2xl font-semibold mb-4 px-">{title}</h2>
          <span className={`text-lg ${styles.typeBox}`}>{type}</span>
          <div className="flex w-full justify-between gap-2 mt-8">
              <button onClick={() => handleEdit}>
              Edit
              </button>

              <button className={styles.switchButton} onClick={() => handlePause(goal.id, status)}>
              {status == 'running' ? (
                <p>pause</p>
              ):(
                <p>resume</p>
              )}
              </button>

          </div>
    </div>
  </>
  )
}

export default Card