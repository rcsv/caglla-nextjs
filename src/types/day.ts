// src/types/day.ts

export type Day = {
    id:      string; // uuid
    tripId:  string; // uuid
    date:    string; // ISO 8601 format
    note?:   string | null;
    createdAt: string; // timestamptz
    updatedAt: string; // timestamptz
};

