"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const isPublic = !pathname.includes("/dashboard");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center group">
          <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="ResumeAchieve"
              width={160}
              height={60}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {isPublic && (
            <>
              <Link
                href="/about"
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="font-bold">
                  Dashboard
                </Button>
              </Link>
              <div className="h-8 w-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="font-bold">
                  Login
                </Button>
              </Link>
              <Link href="/login">
                <Button className="font-bold px-6 shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-purple-600 border-none transition-all hover:scale-105 active:scale-95">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto flex flex-col gap-4 p-6 bg-card shadow-2xl">
            {isPublic && (
              <>
                <Link href="/about" className="text-lg font-bold py-2 border-b">
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-bold py-2 border-b"
                >
                  Contact
                </Link>
              </>
            )}
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full h-12">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full h-12"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full h-12">
                      Login
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full">
                    <Button className="w-full h-12 bg-primary text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
