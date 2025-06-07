
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href={'/'}>
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image 
                    src="/images/logo1.svg" 
                    alt='logo'
                    width={46}
                    height={44}
                    className='w-full h-auto'
                />
            </div>
        </Link>

        <div >
            <ul className='flex items-center gap-8'>
                <NavItems />
                <p>Sign In</p>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar