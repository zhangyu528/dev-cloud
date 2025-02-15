'use client'

import React, { useState } from 'react'
import { EmailStage } from './EmailStage'
import { VerificationStage } from './VerificationStage'

export default function EmailLoginPage() {

  const [email, setEmail] = useState('')
  const [stage, setStage] = useState<'email' | 'verification'>('email')

  return (
    <>
      {stage === 'email' ? (
        <EmailStage 
          email={email}
          setEmail={setEmail}
          setStage={setStage}
        />
      ) : (
        <VerificationStage 
          email={email}
          setStage={setStage}
        />
      )}
    </>
  )
}