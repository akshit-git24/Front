'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

/* ---------------- Button Component ---------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`px-5 py-2.5 font-bold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 ${
      className ?? ''
    }`}
    {...props}
  >
    {children}
  </button>
);

/* ---------------- Header Types ---------------- */

interface DefaultHeaderProps {
  role?: 'Student' | 'Hostel' | 'University' | null;
  onLogout?: () => void;
}

/* ---------------- Header Component ---------------- */

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ role, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (role || typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [role]);

  const getDashboardLink = (): string => {
    if (role === 'Student') return '/student/dashboard';
    if (role === 'Hostel') return '/hostel/dashboard';
    if (role === 'University') return '/university/dashboard';
    return '/university/dashboard';
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold font-serif bg-gradient-to-r from-lime-500 to-sky-500 bg-clip-text text-transparent"
          >
            HostelNET
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-grow justify-center space-x-8 font-sans font-medium">
            <Link href="/" className="text-slate-700 hover:text-lime-600">Home</Link>
            <Link href="/about" className="text-slate-700 hover:text-lime-600">About</Link>
            <Link href="/contact" className="text-slate-700 hover:text-lime-600">Contact</Link>
            <Link href="/RoomieAI" className="text-slate-700 hover:text-lime-600">RoomieAI</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {isLogged ? (
              <>
                <Link href={getDashboardLink()}>
                  <Button className="bg-transparent text-slate-700 hover:bg-slate-100">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={onLogout}
                  className="bg-gradient-to-r from-lime-500 to-sky-500 text-white hover:from-lime-600 hover:to-sky-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/university/login">
                  <Button className="bg-transparent text-slate-700 hover:bg-slate-100">
                    Log In
                  </Button>
                </Link>
                <Link href="/university/register">
                  <Button className="bg-gradient-to-r from-lime-500 to-sky-500 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative w-80 h-full bg-white ml-auto p-6 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-lime-600">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-5 text-lg">
            <Link href="/" className="hover:text-lime-600">Home</Link>
            <Link href="/about" className="hover:text-lime-600">About</Link>
            <Link href="/contact" className="hover:text-lime-600">Contact</Link>
            <Link href="/RoomieAI" className="hover:text-lime-600">RoomireAI</Link>
          </nav>

          <div className="mt-8 pt-6 border-t space-y-4">
            {isLogged ? (
              <>
                <Link href={getDashboardLink()}>
                  <Button className="w-full bg-slate-100">Dashboard</Button>
                </Link>
                <Button onClick={onLogout} className="w-full bg-gradient-to-r from-lime-500 to-sky-500 text-white">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/university/login">
                  <Button className="w-full bg-slate-100">Log In</Button>
                </Link>
                <Link href="/university/register">
                  <Button className="w-full bg-gradient-to-r from-lime-500 to-sky-500 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
    </>
  );
};

export default DefaultHeader;
