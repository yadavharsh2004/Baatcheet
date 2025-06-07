
import Image from 'next/image'
import Link from 'next/link'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
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
                <SignedOut>
                    <SignInButton>
                        <button className='btn-signin'>Sign In</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar