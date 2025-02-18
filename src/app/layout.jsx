import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import SignPage from "@components/SignPage"
import "@styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignPage />
          </SignedOut>
          <SignedIn>
            <nav className='w-full flex justify-end mr-8 p-10'>
              <UserButton />
            </nav>
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}