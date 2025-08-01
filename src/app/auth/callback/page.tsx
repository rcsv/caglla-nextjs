// /src/app/auth/callback/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ログイン成功 → ダッシュボードへ
        router.push('/dashboard');
      } else {
        // セッションなし → エラー表示など
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  return <p>ログイン処理中です...</p>;
}
