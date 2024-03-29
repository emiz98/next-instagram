import { signOut, useSession } from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession()

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        className="w-16 rounded-full border object-contain p-[2px]"
        src={session?.user?.image}
        alt=""
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram 1.0</h3>
      </div>

      <button onClick={signOut} className="text-xs font-semibold text-blue-400">
        Sign out
      </button>
    </div>
  )
}

export default MiniProfile
