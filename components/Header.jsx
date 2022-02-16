import Image from 'next/image'
import { MenuIcon, HomeIcon } from '@heroicons/react/solid'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <div className="sticky top-0 z-50 border-b bg-white">
      <div className=" mx-5 flex max-w-6xl justify-between shadow-sm lg:mx-auto">
        {/* left */}
        <div
          className="relative hidden w-24 cursor-pointer lg:inline-grid"
          onClick={() => router.push('/')}
        >
          <Image
            src="/instagram_desktop.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden"
          onClick={() => router.push('/')}
        >
          <Image
            src="/instagram_mobile.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* middle */}
        <div className="relative mt-1 rounded-md p-3">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="block w-full rounded-md border-gray-300 bg-gray-50 
          pl-10 focus:border-black focus:ring-black sm:text-sm"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />

          {session ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-12" />
                <div
                  className="absolute -top-2 -right-2 flex h-5 
          w-5 animate-bounce items-center justify-center 
          rounded-full bg-red-500 text-xs text-white"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                className="h-10 cursor-pointer rounded-full"
                src={session.user.image}
                alt=""
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
