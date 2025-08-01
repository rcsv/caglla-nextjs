// /src/app/login/page.tsx など

'use client';

import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`, // リダイレクト先
      },
    });

    if (error) {
      console.error('Google Login Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Googleでログイン</h1>
      <button onClick={handleLogin}>Googleログイン</button>
    </div>
  );
}