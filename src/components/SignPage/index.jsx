import React from 'react'

import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { FaRocket } from "react-icons/fa"

import styles from './style.module.css'

const SignPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-3 items-center'>
          <FaRocket className='text-5xl mb-2' />
          <h1 className='text-4xl mb-10'>Sign to get shamed into success!</h1>
        </div>

        <div className='flex items-center justify-center gap-4 text-2xl'>
          <SignInButton mode='modal' className={styles.button} />
          <SignUpButton mode='modal' className={styles.button} />
        </div>
    </div>
  )
}

export default SignPage