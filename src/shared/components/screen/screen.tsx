import React from 'react'

import Header from '../header/header'

interface ScreenProps {
  children: React.ReactNode
}

const Screen = ({ children }: ScreenProps) => {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="bg-white w-full min-h-screen !pt-20 !px-8">{children}</div>
      </div>
    </>
  )
}

export default Screen
