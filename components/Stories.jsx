import blaver from 'blaver'
import Story from './Story'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

function Stories() {
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...blaver.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])

  return (
    <div
      className="mt-8 flex space-x-2 overflow-x-scroll 
    rounded-sm border-gray-200 p-6 scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}
export default Stories
