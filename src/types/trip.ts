// src/types/trip.ts

export type Trip = {
    id:         string; // uuid
    userId:     string; // uuid
    title:      string;
    purpose?:   string | null;
    startDate:  string | null; // ISO 8601 format
    endDate:    string | null; // ISO 8601 format
    currencyId?: string | null;
    timezoneId?: string | null;
    createdAt:  string; // timestamptz
    updatedAt:  string; // timestamptz
};

