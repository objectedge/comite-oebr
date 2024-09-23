import { auth } from "@/auth";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comitê OE Brasil",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {session?.user && (
          <header className="flex items-center w-full gap-4 justify-end p-4 py-2 border-b">
            <span className="flex-grow">
              Votação Comitê OE Brasil -{" "}
              <b>{process.env.ROUND === "1" ? "Primeiro" : "Segundo"} turno</b>
            </span>
            <span className="max-md:hidden">
              logado como <b>{session.user.name}</b>
            </span>
            <Image
              width={50}
              height={50}
              src={session.user.image as string}
              alt={session.user.name as string}
              className="rounded-full"
            />
          </header>
        )}
        <main className="p-4 flex flex-col justify-center">{children}</main>
      </body>
    </html>
  );
}
