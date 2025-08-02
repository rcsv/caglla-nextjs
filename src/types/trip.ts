// src/types/trip.ts

export type Trip = {
    id:         string;
    user_id:    string;
    title:      string;
    purpose?:   string | null;
    start_date: string | null; // ISO 8601 format
    end_date:   string | null; // ISO 8601 format
    currencyId?: string | null;
    timezoneId?: string | null;
    createdAt:  string;
    updatedAt:  string;
};

