import NextAuth from "next-auth"
import { config } from '..'


const handler = NextAuth(config)

export { handler as GET, handler as POST }