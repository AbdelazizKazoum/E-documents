import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

const handler = NextAuth({
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user, profile, account }) {
      // console.log({ token, user, profile, account })

      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.id = user.id
        token.name = user.name
      }

      if (profile) {
        token.username = (profile as any).preferred_username
        token.firstname = (profile as any).given_name
        token.lastname = (profile as any).family_name

        // token.roles = (profile as any).realm_access.roles
        token.roles = (profile as any).resource_access[process.env.KEYCLOAK_CLIENT_ID!]?.roles || []
      }

      if (account) {
        token.id_token = account.id_token
      }

      return token
    },
    async session({ session, token }) {
      // console.log({ ...session, ...token, user: undefined })

      return { ...session, ...token, user: undefined }
    }
  },
  events: {
    async signOut({ token }) {
      const logOutUrl = new URL(`${process.env.KEYCLOAK_ISSUER!}/protocol/openid-connect/logout`)

      logOutUrl.searchParams.set('id_token_hint', token.id_token as string)

      await fetch(logOutUrl)
    }
  }
})

export { handler as GET, handler as POST }
