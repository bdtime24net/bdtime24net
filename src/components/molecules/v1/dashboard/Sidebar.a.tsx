'use client'
import React, { useState } from 'react'
import {ArrowRightOutlined} from '@ant-design/icons'
const Politics = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex'>
        <div className={` bg-purple-200 h-svh p-5 pt-8 ${sidebarOpen ? 'w-72' : 'w-20'} duration-300 relative`}>
            <ArrowRightOutlined className={`rounded-full bg-white absolute cursor-pointer -right-3 top-9 w-7 h-7 border-0 ${!sidebarOpen && 'rotate-180'}`} onClick={() => setSidebarOpen(!sidebarOpen)} />
            <div>
            <p>hello</p>
        </div>
        </div>
        
        <div className='bg-purple-500 '>
            <p className='text-white'> hello</p>
        </div>

    </div>
  )
}

export default Politics