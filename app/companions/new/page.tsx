import CompanionForm from '@/components/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const NewCompanion = async () => {
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();


  return (
    <main className={`${canCreateCompanion? 'lg:w-1/3':''} min-md:w-2/3 items-center justify-center`}>
      {canCreateCompanion ? (
        <article className='w-full gap-4 flex flex-col  '>
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ):
      (
        <article className='companion-limit'>
          <Image 
            src={'/images/limit.svg'}
            alt='companion limit reached'
            width={460}
            height={330}
          />
          <div className='cta-badge flex justify-center w-full'>
            Upgrade your plan 
          </div>

          <h1>You've reached your limit</h1>
          <p>You've reached your companion limit. Upgrade to create more companions and access premium features. </p>
          <Link href={'/subscription'} className='btn-primary w-full justify-center'>
            Upgrade My Plan
          </Link>
        </article>
      )
      }
    </main>
  )
}

export default NewCompanion