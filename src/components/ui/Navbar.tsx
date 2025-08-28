import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="font-mono w-full flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-50">
      <Link href="/" className="text-2xl">Curiko</Link>
      <div className="space-x-10 text-gray-500">
        <Link href="/" className="hover:text-gray-300 transition-all duration-150">Home</Link>
        <Link href="/about" className="hover:text-gray-300 transition-all duration-150">About</Link>
        <Link href="/features" className="hover:text-gray-300 transition-all duration-150">Features</Link>
        <Link href="/chat" className="hover:text-gray-300 transition-all duration-150">Chat</Link>
        <Link href="/signup" className="hover:text-gray-300 transition-all duration-150">Sign Up</Link>
      </div>
    </nav>
  )
}