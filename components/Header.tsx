'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultHeader from '@/components/DefaultHeader';

/* ---------------- Types ---------------- */

type UserRole = 'Student' | 'Hostel' | 'University';

/* ---------------- Component ---------------- */

const Header = () => {
  const router = useRouter();

  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson) as { role?: unknown };

      // 🔒 HARD TYPE GUARD (this is the important part)
      if (
        payload.role === 'Student' ||
        payload.role === 'Hostel' ||
        payload.role === 'University'
      ) {
        setRole(payload.role);
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error('Invalid token', err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    router.push('/login');
  };

  if (loading) return null; // or a spinner if you want

  return <DefaultHeader role={role} onLogout={handleLogout} />;
};

export default Header;
