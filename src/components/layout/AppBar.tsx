"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
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
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

        .ab-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          font-family: 'Manrope', sans-serif;
          padding: 10px 16px 0;
          transition: padding 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .ab-root.scrolled {
          padding: 8px 20px 0;
        }

        .ab-pill {
          background: #ffffff;
          border: 1.5px solid rgba(108,99,255,0.13);
          border-radius: 20px;
          box-shadow: 0 2px 16px rgba(108,99,255,0.07), 0 1px 4px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          max-width: 1280px;
          margin: 0 auto;
        }

        .ab-root.scrolled .ab-pill {
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(108,99,255,0.11), 0 2px 8px rgba(0,0,0,0.05);
        }

        .ab-bar {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 20px;
          gap: 8px;
        }

        .ab-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .ab-logo-icon {
          width: 33px;
          height: 33px;
          background: linear-gradient(135deg, #6C63FF 0%, #9D95FF 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(108,99,255,0.28);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .ab-logo:hover .ab-logo-icon {
          transform: scale(1.07) rotate(-4deg);
          box-shadow: 0 6px 20px rgba(108,99,255,0.38);
        }

        .ab-logo-icon svg {
          width: 16px; height: 16px;
          color: #fff;
          stroke-width: 2.5;
        }

        .ab-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.5px;
          color: #0f0f1a;
          transition: color 0.18s ease;
        }

        .ab-logo-accent {
          color: #6C63FF;
        }

        .ab-logo:hover .ab-logo-text {
          color: #6C63FF;
        }

        .ab-nav {
          display: none;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .ab-nav { display: flex; }
          .ab-mobile-toggle { display: none !important; }
          .ab-actions { display: flex !important; }
        }

        .ab-nav-link {
          position: relative;
          padding: 7px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #52525b;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.18s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .ab-nav-link svg {
          width: 14px; height: 14px;
          flex-shrink: 0;
        }

        .ab-nav-link:hover {
          color: #6C63FF;
          background: rgba(108,99,255,0.08);
        }

        .ab-nav-link.active {
          color: #6C63FF;
          background: rgba(108,99,255,0.09);
          font-weight: 700;
        }

        .ab-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 2px;
          background: #6C63FF;
          border-radius: 2px;
        }

        .ab-divider {
          width: 1px;
          height: 18px;
          background: rgba(108,99,255,0.13);
          margin: 0 6px;
          flex-shrink: 0;
        }

        .ab-actions {
          display: none;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .ab-btn-ghost {
          padding: 8px 15px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #52525b;
          background: transparent;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .ab-btn-ghost:hover {
          color: #6C63FF;
          background: rgba(108,99,255,0.08);
        }

        .ab-btn-primary {
          padding: 9px 18px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          background: #6C63FF;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
          letter-spacing: 0.01em;
          white-space: nowrap;
          box-shadow: 0 3px 12px rgba(108,99,255,0.28);
        }

        .ab-btn-primary:hover {
          background: #8B85FF;
          transform: translateY(-1px);
          box-shadow: 0 7px 22px rgba(108,99,255,0.36);
        }

        .ab-btn-primary:active {
          transform: translateY(0);
        }

        .ab-btn-primary svg { width: 14px; height: 14px; }

        .ab-btn-logout {
          padding: 8px 14px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #a1a1aa;
          background: transparent;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .ab-btn-logout svg { width: 14px; height: 14px; }

        .ab-btn-logout:hover {
          color: #ef4444;
          background: #fef2f2;
          border-color: #fca5a5;
        }

        .ab-mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          border: 1.5px solid #e4e4e7;
          background: transparent;
          color: #52525b;
          cursor: pointer;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .ab-mobile-toggle:hover {
          background: rgba(108,99,255,0.08);
          border-color: rgba(108,99,255,0.2);
          color: #6C63FF;
        }

        .ab-mobile-toggle svg { width: 18px; height: 18px; }

        .ab-mobile-menu {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease;
        }

        .ab-mobile-menu.open {
          max-height: 560px;
          opacity: 1;
        }

        .ab-mobile-inner {
          padding: 8px 10px 16px;
          border-top: 1.5px solid #f4f4f5;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ab-mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          font-size: 15px;
          font-weight: 600;
          color: #52525b;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.18s ease;
          letter-spacing: 0.01em;
        }

        .ab-mobile-link svg {
          width: 16px; height: 16px;
          flex-shrink: 0;
        }

        .ab-mobile-link:hover {
          color: #6C63FF;
          background: rgba(108,99,255,0.08);
        }

        .ab-mobile-link.active {
          color: #6C63FF;
          background: rgba(108,99,255,0.09);
          font-weight: 700;
        }

        .ab-mobile-divider {
          height: 1.5px;
          background: #f4f4f5;
          margin: 8px 0 10px;
        }

        .ab-mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ab-mobile-btn-primary {
          padding: 13px 20px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          background: #6C63FF;
          border: none;
          border-radius: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(108,99,255,0.26);
          letter-spacing: 0.01em;
        }

        .ab-mobile-btn-primary:hover { background: #8B85FF; }

        .ab-mobile-btn-outline {
          padding: 12px 20px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #52525b;
          background: transparent;
          border: 1.5px solid #e4e4e7;
          border-radius: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          transition: all 0.18s ease;
          letter-spacing: 0.01em;
        }

        .ab-mobile-btn-outline:hover {
          color: #6C63FF;
          border-color: #6C63FF;
          background: rgba(108,99,255,0.06);
        }

        .ab-mobile-btn-logout {
          padding: 12px 20px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ef4444;
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          border-radius: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          transition: all 0.18s ease;
          letter-spacing: 0.01em;
        }

        .ab-mobile-btn-logout:hover { background: #fee2e2; }
      `}</style>

      <header className={`ab-root ${isScrolled ? "scrolled" : ""}`}>
        <div className="ab-pill">
          <div className="ab-bar">
            <Link href="/" className="ab-logo">
              <div className="ab-logo-icon">
                <FileText />
              </div>
              <span className="ab-logo-text">
                resume<span className="ab-logo-accent">achieve</span>
              </span>
            </Link>

            <nav className="ab-nav">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ab-nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}

              {authItems.length > 0 && <div className="ab-divider" />}

              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ab-nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ab-actions">
              {isAuthenticated ? (
                <button className="ab-btn-logout" onClick={handleLogout}>
                  <LogOut />
                  Log out
                </button>
              ) : (
                <>
                  <button
                    className="ab-btn-ghost"
                    onClick={() => router.push("/login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="ab-btn-primary"
                    onClick={() => router.push("/login")}
                  >
                    <Sparkles />
                    Get Started
                  </button>
                </>
              )}
            </div>

            <button
              className="ab-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          <div className={`ab-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <div className="ab-mobile-inner">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ab-mobile-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ab-mobile-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}

              <div className="ab-mobile-divider" />

              <div className="ab-mobile-actions">
                {isAuthenticated ? (
                  <button
                    className="ab-mobile-btn-logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                ) : (
                  <>
                    <button
                      className="ab-mobile-btn-outline"
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="ab-mobile-btn-primary"
                      onClick={() => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Sparkles size={16} />
                      Get Started Free
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
