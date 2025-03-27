'use client'

import React from 'react'
import { useState } from "react";

import styles from "./style.module.css"


const Bubble = ({ roast }) => {

  return (
    <>
      <div className={`p-4 w-full ${styles.bubble}` }>
          <p>Do you want to { roast.goal }?</p>
          <p>{ roast.message }</p>
      </div>
  </>
  )
}

export default Bubble;