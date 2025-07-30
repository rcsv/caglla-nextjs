// /src/app/test/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Trip = {
    id: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
};

export default function TestPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            const { data, error } = await supabase.from('trips').select('*');
            if (error) {
                console.error('Error fetching trips:', error.message);
            }
            else {
                setTrips(data);
            }
            setLoading(false);
        };

        fetchTrips();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <h1>Supabase Connection Established?</h1>
            {trips.length === 0 ? (
                <p>Cannot find trip data.</p>
            ) : (
                <ul>
                    {trips.map((trip) => (
                        <li key={trip.id}>
                            <h2>{trip.title}</h2>
                            <p>Start Date: {trip.start_date || 'N/A'}</p>
                            <p>End Date: {trip.end_date || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
