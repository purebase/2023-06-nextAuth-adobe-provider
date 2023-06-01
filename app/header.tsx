'use client'

import styles from "./header.module.css"
import { SignIn, SignOut } from "./actions"
import { unstable_getServerSession } from "next-auth/next"

export default async function Header() {
  const session = await unstable_getServerSession()

  return (
    <header className={styles.signedInStatus}>
      <div className={styles.loaded}>
        {session?.user ? (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <SignOut />
          </>
        ) : (
          <>
            <span className={styles.notSignedInText}>
              You are not signed in
            </span>
            <SignIn />
          </>
        )}
      </div>
    </header>
  )
}
