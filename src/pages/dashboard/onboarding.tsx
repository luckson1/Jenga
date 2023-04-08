import React from 'react'
import Onboarding from '../../components/forms/Onboarding'
import Head from 'next/head'

const onboarding = () => {
    
  return (
   <>
    <Head>
        <title>Jenga</title>
        <meta name="description" content="Build your Dream Spaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
   <Onboarding />
   </>
  )
}

export default onboarding