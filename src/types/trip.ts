// src/types/trip.ts

export type Trip = {
    id:         string;
    userId:     string;
    title:      string;
    purpose?:   string | null;
    startDate:  string | null; // ISO 8601 format
    endDate:    string | null; // ISO 8601 format
    currencyId?: string | null;
    timezoneId?: string | null;
    createdAt:  string;
    updatedAt:  string;
};

