'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import LogoutButton from '@/components/LogoutButton';

type Trip = {
  id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/login');
        return;
      }

      setUserId(session.user.id);

      const { data, error } = await supabase
        .from('Trip')
        .select('*')
        .eq('user_id', session.user.id)
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Failed to fetch trips:', error.message);
      } else {
        setTrips(data);
      }

      setLoading(false);
    };

    fetchTrips();
  }, [router]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>マイ旅行一覧</h1>
      <LogoutButton />

      {trips.length === 0 ? (
        <p>旅行が見つかりません。新しい旅行を作成してください。</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id} style={{ marginBottom: '1rem' }}>
              <strong>{trip.title}</strong><br />
              {trip.start_date} 〜 {trip.end_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
