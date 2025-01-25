import Link from "next/link";
import { Home, User, Settings } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Logo</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Home className="mr-1 inline-block h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="/profile"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <User className="mr-1 inline-block h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Settings className="mr-1 inline-block h-5 w-5" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
