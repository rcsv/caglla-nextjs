// /src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        router.push('/login'); // 未ログインならログインページへ
        return;
      }

      setUserEmail(session.user.email);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ダッシュボード</h1>
      <p>ようこそ、{userEmail} さん！</p>
      <LogoutButton />
    </div>
  );
}
