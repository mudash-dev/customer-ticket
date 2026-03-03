import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedIn,
  SignedOut, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TICKETLY",
  description: "Create a ticket for any app issue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex justify-between p-4 bg-purple-700">
          <h1 className=" text-3xl font-bold text-slate-100">TICKETLY</h1>
          {/*So display Login if out, user profile if in*/}
          <SignedOut>
            <SignInButton mode="modal"/>
          </SignedOut>
          <SignedIn>
            <UserButton showName/>
          </SignedIn>
          
        </header>
        {children}
      </body>
      </html>
    </ClerkProvider>
  );
}
