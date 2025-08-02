// src/types/day.ts

export type Day = {
    id:      string;
    tripId:  string;
    date:    string; // ISO 8601 format
    note?:   string | null;
    createdAt: string;
    updatedAt: string;
};

