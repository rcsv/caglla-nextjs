// src/types/master.ts

// --- Currency
export type MstCurrency = {
    id:        string;
    name:      string;
    code:      string;
    symbol?:   string | null;
    createdAt: string;
    updatedAt: string;
};


// --- Timezone
export type MstTimezone = {
    id:        string;
    name:      string;
    offset?:   string | null; // e.g., "+09:00"
    createdAt: string;
    updatedAt: string;
};

// --- Checklist Item
export type MstCheckItem = {
    id:        string;
    label:     string;
    category?: string | null; // e.g., "Accommodation", "Transport"
    createdAt: string;
    updatedAt: string;
};

// --- Activity
export type MstActivity = {
    id:        string;
    name:      string;
    category?: string | null; // e.g., "Sightseeing", "Dining"
    createdAt: string;
    updatedAt: string;
};

// --- Locale
export type MstLocale = {
    id:        string;
    code:      string;
    label:     string; // e.g., "en", "ja"
    createdAt: string;
    updatedAt: string;
};

