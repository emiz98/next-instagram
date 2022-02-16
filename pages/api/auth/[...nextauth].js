import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  //    default login screen
  //   theme: {
  //     logo: '/instagram_desktop.png',
  //     brandColor: '#F13287',
  //     colorScheme: 'auto',
  //   },

  //    custom login screen
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    //Menura Adithya --> menura_adithya
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(' ')
        .join('_')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
