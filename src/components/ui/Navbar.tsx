import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="font-mono w-full flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-50">
      <Link href="/" className="text-2xl">Curiko</Link>
      <div className="space-x-6 text-gray-500">
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/features" className="hover:text-white">Features</Link>
        <Link href="/contact" className="hover:text-white">Contact</Link>
      </div>
    </nav>
  )
}