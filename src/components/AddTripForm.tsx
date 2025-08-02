"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import type { Trip } from "@/types";

type Props = {
  userId: string;
  onCreated: (trip: Trip) => void;
  onCancel: () => void;
};

export default function AddTripForm({ userId, onCreated, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("trips")
      .insert({
        user_id: userId,
        title,
        start_date: startDate || null,
        end_date: endDate || null,
      })
      .select()
      .single();
    setLoading(false);
    if (error) {
      console.error("Failed to create trip:", error.message);
      return;
    }
    if (data) {
      const trip: Trip = {
        id: data.id,
        userId: data.user_id,
        title: data.title,
        purpose: data.purpose,
        startDate: data.start_date,
        endDate: data.end_date,
        currencyId: data.currency_id,
        timezoneId: data.timezone_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
      onCreated(trip);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div>
        <label>
          タイトル:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          開始日:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          終了日:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <button type="submit" disabled={loading}>
          {loading ? "保存中..." : "保存"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "0.5rem" }}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
