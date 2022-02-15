import Stories from './Stories'
import Posts from './Posts'

function Feed() {
  return (
    <main
      className="mx-auto grid grid-cols-1 md:max-w-3xl
    md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3"
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {/* Mini profile */}
      {/* Suggestions */}
      <section></section>
    </main>
  )
}

export default Feed
