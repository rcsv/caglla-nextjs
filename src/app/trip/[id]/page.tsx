"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import type { Trip } from "@/types";
import type { PostgrestError } from "@supabase/supabase-js";
import "./trip.css";

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push("/login");
        return;
      }
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        const pgError = error as PostgrestError;
        if (pgError.code === "PGRST116") {
          notFound();
          return;
        }
        setError(pgError.message);
      } else {
        setTrip({
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
        });
      }
      setLoading(false);
    };
    load();
  }, [id, router]);

  useEffect(() => {
    const body = document.body;
    const btnNav = document.querySelector(".btn-leftnav-toggle");
    const btnMap = document.querySelector(".btn-map-toggle");
    const backdrop = document.querySelector(".backdrop");

    const onNav = () => {
      const w = window.innerWidth;
      if (w >= 992) {
        body.classList.toggle("has-leftnav-expanded");
        body.classList.toggle("has-leftnav-collapsed");
      } else if (w >= 768) {
        body.classList.toggle("overlay-leftnav-open");
      } else {
        body.classList.toggle("offcanvas-open");
      }
    };
    const onMap = () => {
      if (window.innerWidth < 768) {
        body.classList.toggle("show-map-fullscreen");
      }
    };
    const onBackdrop = () => {
      body.classList.remove("offcanvas-open");
    };
    const cleanState = () => {
      const w = window.innerWidth;
      if (w >= 992) {
        body.classList.remove("overlay-leftnav-open", "offcanvas-open");
      } else if (w >= 768) {
        body.classList.remove("offcanvas-open");
      } else {
        body.classList.remove("overlay-leftnav-open");
      }
    };

    btnNav?.addEventListener("click", onNav);
    btnMap?.addEventListener("click", onMap);
    backdrop?.addEventListener("click", onBackdrop);
    window.addEventListener("resize", cleanState);
    return () => {
      btnNav?.removeEventListener("click", onNav);
      btnMap?.removeEventListener("click", onMap);
      backdrop?.removeEventListener("click", onBackdrop);
      window.removeEventListener("resize", cleanState);
    };
  }, []);

  if (loading) return null;
  if (error) return <div style={{ padding: "2rem" }}>{error}</div>;
  if (!trip) return null;

  return (
    <div className="appgrid">
      <section className="left-pane">
        <header className="left-header">
          <button className="btn-leftnav-toggle" aria-label="Toggle left menu">☰</button>
          <div className="left-header__title">{trip.title}</div>
          <div className="left-header__spacer"></div>
          <button className="btn-map-toggle" aria-label="Show map (mobile)">🗺️</button>
        </header>
        <div className="left-body">
          <nav className="leftnav" aria-label="Sidebar navigation">
            <ul className="leftnav__items">
              <li className="item" title="Dashboard">🏠<span className="label">Summary</span></li>
              <li className="item" title="Trips">🧳<span className="label">Itinerary</span></li>
              <li className="item" title="Checklist">✅<span className="label">Checklist</span></li>
            </ul>
          </nav>
          <main className="main">
            <article className="card">
              <h1 className="card__title">{trip.title}</h1>
              {trip.startDate && trip.endDate && (
                <p className="card__description">
                  {trip.startDate} 〜 {trip.endDate}
                </p>
              )}
            </article>
          </main>
        </div>
      </section>
      <aside className="right-pane" aria-label="Map">
        <div className="map">
          <div className="map-canvas">MAP AREA</div>
          <div className="map-overlay">
            <div className="top">
              <div className="cols flex">
                <input className="poi-input" placeholder="Search Spot..." />
                <div className="chip">Filter: ALL</div>
              </div>
              <div className="cols right">
                <button className="icon-btn" aria-label="Zoom In">+</button>
              </div>
              <div className="cols right">
                <button className="icon-btn" aria-label="Zoom Out">-</button>
              </div>
              <div className="cols right">
                <button className="icon-btn" aria-label="Current">X</button>
              </div>
            </div>
            <div className="bottom">
              <div className="cols flex">
                <div className="chip">&lt; 1 of 13 &gt;</div>
                <div className="chip">import</div>
                <div className="chip">X</div>
              </div>
              <div className="map-dialog">
                <h1>Dialog</h1>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="backdrop" aria-hidden="true"></div>
    </div>
  );
}

