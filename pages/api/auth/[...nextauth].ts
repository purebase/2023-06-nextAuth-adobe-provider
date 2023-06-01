import NextAuth, {NextAuthOptions} from "next-auth"
import {AdobeProvider} from "../../../app/AdobeProvider";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    AdobeProvider({
      clientId: process.env.ADOBE_ID as string,
      clientSecret: process.env.ADOBE_SECRET as string

    })
  ],
}

export default NextAuth(authOptions)
