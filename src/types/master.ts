// src/types/master.ts

// --- Currency
export type M_Currency = {
    id:          string;
    name:        string;
    code:        string;
    symbol?:     string | null;
};


// --- Timezone
export type M_Timezone = {
    id:          string;
    name:        string;
    offset?:     string | null; // e.g., "+09:00"
//    isDst?:      boolean; // Daylight Saving Time
};

// --- Checklist Item
export type M_CheckItem = {
    id:          string;
    label:       string;
    category?:   string | null; // e.g., "Accommodation", "Transport"
};

// --- Activity
export type M_Activity = {
    id:          string;
    name:        string;
    category?:   string | null; // e.g., "Sightseeing", "Dining"
};

// --- Locale
export type M_Locale = {
    id:          string;
    code:        string;
    label:       string; // e.g., "en", "ja"
};

