import { useEffect, useState } from 'react'
import blaver from 'blaver'

function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...blaver.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="font-medium text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            className="w-10 rounded-full border object-contain p-[2px]"
            src={profile.avatar}
            alt=""
          />

          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>

          <button className="text-xs font-medium text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
