import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>

        <div className="navbar bg-base-100">

          <Link href="/" className="btn btn-ghost text-xl">
            My Portfolio
          </Link>

          <Link href="/about" className="btn btn-link">
            About
          </Link>

        </div>

        {children}

      </body>
    </html>
  );
}