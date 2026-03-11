import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ernest Portfolio",
  description: "Tech Courses and Books",
  keywords: "tech, programming, courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost text-xl">
              Ernest Portfolio
            </Link>
          </div>

          <div className="navbar-center">
            <ul className="menu menu-horizontal px-1">
              <li><Link
                href="/about">About</Link></li> 
                <li><Link href="/about/contact">Contact</Link></li>
              <li><Link href="/githubusers">GitHub Users</Link></li>
            </ul>
          </div>

          <div className="navbar-end">
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </body>
    </html>
  );
}