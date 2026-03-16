"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  FileText,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Menu,
} from "lucide-react";

export function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const authItems = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/resumes", label: "My Resumes", icon: FileText },
      ]
    : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Image on desktop, text on mobile */}
          <Link href="/" className="flex items-center group">
            {/* Desktop: Show image logo */}
            <div className="hidden sm:block relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="ResumeAchieve"
                width={140}
                height={48}
                className="object-contain h-9 w-auto"
                priority
              />
            </div>
            {/* Mobile: Show text logo */}
            <div className="sm:hidden">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAchieve
              </span>
            </div>
          </Link>

          {}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full group ${
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    pathname === item.href ? "w-6" : "w-0 group-hover:w-6"
                  }`}
                />
              </Link>
            ))}

            {authItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full ${
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="text-gray-600 hover:text-blue-600 font-semibold"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-300/70 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
