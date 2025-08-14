// src/types/master.ts

// --- Currency
export type MstCurrency = {
    id:        string;
    name:      string;
    code:      string;
    symbol?:   string | null;
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};


// --- Timezone
export type MstTimezone = {
    id:        string;
    name:      string;
    offset?:   string | null; // e.g., "+09:00"
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};

// --- Checklist Item
export type MstCheckItem = {
    id:        string;
    label:     string;
    category?: string | null; // e.g., "Accommodation", "Transport"
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};

// --- Activity
export type MstActivity = {
    id:        string;
    name:      string;
    category?: string | null; // e.g., "Sightseeing", "Dining"
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};

// --- Locale
export type MstLocale = {
    id:        string;
    code:      string;
    label:     string; // e.g., "en", "ja"
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};

