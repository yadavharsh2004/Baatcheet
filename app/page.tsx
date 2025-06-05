import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <div>
      <h1 className='text-2xl underline text-center mt-20'> Welcome to my Saas App</h1>
      <Button className='cursor-pointer mt-20 flex mx-auto'>
        Let's get started
      </Button>
    </div>
  )
}

export default Page