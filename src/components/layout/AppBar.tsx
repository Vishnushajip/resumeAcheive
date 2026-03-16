"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

export function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .appbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .appbar-root.scrolled {
          padding: 0;
        }

        .appbar-root.scrolled .appbar-inner {
          background: rgba(8, 8, 12, 0.92);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
        }

        .appbar-inner {
          background: rgba(8, 8, 12, 0.75);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .appbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 0;
          flex-shrink: 0;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .logo-main {
          color: #ffffff;
        }

        .logo-dot-com {
          color: #6C63FF;
        }

        .logo-wrap:hover .logo-main {
          opacity: 0.85;
        }

        .logo-wrap:hover .logo-dot-com {
          color: #9D95FF;
        }

        .logo-main, .logo-dot-com {
          transition: all 0.2s ease;
        }

        .nav-desktop {
          display: none;
          align-items: center;
          gap: 2px;
        }

        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .mobile-toggle { display: none !important; }
          .actions-desktop { display: flex !important; }
        }

        .nav-link {
          position: relative;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.01em;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.07);
        }

        .nav-link.active {
          color: #ffffff;
          background: rgba(108, 99, 255, 0.15);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          background: #6C63FF;
          border-radius: 1px;
        }

        .nav-link svg {
          width: 15px;
          height: 15px;
          opacity: 0.7;
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 8px;
        }

        .actions-desktop {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .btn-ghost {
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .btn-ghost:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.07);
        }

        .btn-primary {
          padding: 9px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background: #6C63FF;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.4);
        }

        .btn-primary:hover {
          background: #7B74FF;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(108, 99, 255, 0.35);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-primary svg {
          width: 15px;
          height: 15px;
        }

        .btn-logout {
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s ease;
        }

        .btn-logout:hover {
          color: #FF6B6B;
          background: rgba(255, 107, 107, 0.08);
          border-color: rgba(255, 107, 107, 0.25);
        }

        .btn-logout svg {
          width: 15px;
          height: 15px;
        }

        .mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .mobile-toggle svg {
          width: 18px;
          height: 18px;
        }

        .mobile-menu {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .mobile-menu.open {
          max-height: 600px;
          opacity: 1;
        }

        .mobile-menu.closed {
          max-height: 0;
          opacity: 0;
        }

        .mobile-menu-inner {
          padding: 12px 20px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(8, 8, 14, 0.98);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .mobile-nav-link.active {
          color: #ffffff;
          background: rgba(108, 99, 255, 0.15);
        }

        .mobile-nav-link svg {
          width: 16px;
          height: 16px;
          opacity: 0.7;
        }

        .mobile-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 8px 0;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 4px;
        }

        .btn-mobile-primary {
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          background: #6C63FF;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .btn-mobile-primary:hover {
          background: #7B74FF;
        }

        .btn-mobile-outline {
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .btn-mobile-outline:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .btn-mobile-logout {
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 107, 107, 0.8);
          background: rgba(255, 107, 107, 0.06);
          border: 1px solid rgba(255, 107, 107, 0.15);
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .btn-mobile-logout:hover {
          background: rgba(255, 107, 107, 0.12);
          color: #FF6B6B;
        }
      `}</style>

      <header className={`appbar-root ${isScrolled ? "scrolled" : ""}`}>
        <div className="appbar-inner">
          <div className="appbar-container">
            <Link href="/" className="logo-wrap">
              <span className="logo-text">
                <span className="logo-main">resumeachieve</span>
                <span className="logo-dot-com">.com</span>
              </span>
            </Link>

            <nav className="nav-desktop">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}

              {authItems.length > 0 && <div className="nav-divider" />}

              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="actions-desktop">
              {isAuthenticated ? (
                <button className="btn-logout" onClick={handleLogout}>
                  <LogOut />
                  Log out
                </button>
              ) : (
                <>
                  <button
                    className="btn-ghost"
                    onClick={() => router.push("/login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => router.push("/login")}
                  >
                    <Sparkles />
                    Get Started
                  </button>
                </>
              )}
            </div>

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className={`mobile-menu ${isMobileMenuOpen ? "open" : "closed"}`}
          >
            <div className="mobile-menu-inner">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}

              <div className="mobile-divider" />

              <div className="mobile-actions">
                {isAuthenticated ? (
                  <button className="btn-mobile-logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    Log out
                  </button>
                ) : (
                  <>
                    <button
                      className="btn-mobile-outline"
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="btn-mobile-primary"
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Sparkles size={16} />
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
