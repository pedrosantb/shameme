'use client'

import React from 'react'
import { useState } from "react";

import styles from "./style.module.css"


const Card = ({ title, type, status, onEdit, onPause }) => {
  return (

    <div className={`p-4 ${styles.card}` }>
        <h2 className="text-2xl font-semibold mb-4 px-">{title}</h2>
        <span className={`text-lg ${styles.typeBox}`}>{type}</span>
        <div className="flex w-full justify-between gap-2 mt-8">
            <button onClick={onEdit}>
            Edit
            </button>

            <button className={styles.switchButton} onClick={onPause}>
            {status == 'running' ? (
              <p>pause</p>
            ):(
              <p>resume</p>
            )}
            </button>

        </div>
  </div>
  )
}

export default Card