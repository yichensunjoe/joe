import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-gradient-to-b from-red-800 to-red-700 text-white">
      <div className="container px-4 mx-auto">
        <div className="flex items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            Joe出品，必属精品
          </Link>
          <nav className="hidden ml-8 space-x-4 md:flex">
            <Link href="#" className="hover:text-red-200">
              八字
            </Link>
            <Link href="#" className="hover:text-red-200">
              称骨
            </Link>
            <Link href="#" className="hover:text-red-200">
              测名
            </Link>
            <Link href="#" className="hover:text-red-200">
              抽签
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

