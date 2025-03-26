'use client'

import React from 'react'
import { useState } from "react";

import styles from "./style.module.css"


const Card = ({ roast }) => {

  return (
    <>
      <div className={`p-4 ${styles.card}` }>
          <p>{ roast.message }</p>
      </div>
  </>
  )
}

export default Card