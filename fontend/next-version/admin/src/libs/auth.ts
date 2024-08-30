import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// class customError extends AuthError {
//   constructor(message: string) {
//     super()
//     this.message = message
//   }
// }

const handlers = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      name: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const getToken = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const resGetToken = await getToken.json()

        if (!getToken.ok) {
          throw new Error(JSON.stringify(resGetToken))
        }

        if (resGetToken.status != 200) {
          throw new Error(JSON.stringify(resGetToken))
        }

        const getUser = await fetch(`${process.env.API_URL}/auth/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resGetToken.data.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await getUser.json()

        return { ...user.data, token: resGetToken.data.token }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as any).token
      }

      return token
    },
    async session({ session, token }) {
      if (token?.token) {
        try {
          const request = await fetch(`${process.env.API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token.token}`
            },
            method: 'POST'
          })
          const res = await request.json()

          return { ...session, user: res.data, token: token.token }
        } catch (error) {
          console.error('Error fetching user data:')
        }
      }

      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/'
  }
})

export default handlers
