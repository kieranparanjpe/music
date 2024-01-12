import NextAuth from "next-auth"
import {authOptions} from "@/app/util/auth";

const handler = NextAuth(authOptions)

export interface Session{
    accessToken : string
}

export { handler as GET, handler as POST }