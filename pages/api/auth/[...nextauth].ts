import NextAuth from "next-auth"
import FackbookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FackbookProvider({
      clientId: process.env.FACEBOOK_CIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret : process.env.NEXTAUTH_SECRET!,
  pages : {
    signIn : '/auth/signin',
  }
}

export default NextAuth(authOptions)