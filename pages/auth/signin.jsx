import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import Header from '../../components/Header'

function signin({ providers }) {
  return (
    <>
      <Header />

      <div
        className="-mt-2 flex min-h-screen flex-col items-center 
      justify-center py-2 px-4 text-center"
      >
        <img className="w-80" src="/instagram_desktop.png" alt="" />
        <p className="font-xs italic">
          This is not a real app, It is built only for educational purposes
          only.
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signin
