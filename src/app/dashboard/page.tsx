"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabase/client";
import LogoutButton from "@/components/LogoutButton";
import type { Trip } from "@/types";

const AddTripForm = dynamic(() => import("@/components/AddTripForm"), {
  ssr: false,
});

/**
 * Displays the authenticated user's list of trips, allowing them to add new trips and log out.
 *
 * Redirects unauthenticated users to the login page. Fetches and displays trips associated with the current user, and provides a form for creating new trips. Shows loading and empty states as appropriate.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push("/login");
        return;
      }

      setUserId(session.user.id);

      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("user_id", session.user.id)
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Failed to fetch trips:", error.message);
      } else {
        const mapped: Trip[] = (data || []).map((t) => ({
          id: t.id,
          userId: t.user_id,
          title: t.title,
          purpose: t.purpose,
          startDate: t.start_date,
          endDate: t.end_date,
          currencyId: t.currency_id,
          timezoneId: t.timezone_id,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
        }));
        setTrips(mapped);
      }

      setLoading(false);
    };

    fetchTrips();
  }, [router]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>マイ旅行一覧</h1>
      <LogoutButton />
      <div style={{ margin: "1rem 0" }}>
        <button onClick={() => setShowForm(true)}>新しい旅行を追加</button>
      </div>
      {showForm && userId && (
        <AddTripForm
          userId={userId}
          onCreated={(trip) => setTrips([...trips, trip])}
          onCancel={() => setShowForm(false)}
        />
      )}

      {trips.length === 0 ? (
        <p>旅行が見つかりません。新しい旅行を作成してください。</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id} style={{ marginBottom: "1rem" }}>
              <strong>{trip.title}</strong>
              <br />
              {trip.startDate} 〜 {trip.endDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
