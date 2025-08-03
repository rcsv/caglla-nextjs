// src/types/profile.ts

export type Profile = {
    id:          string;
    userId:      string;
    nickname?:   string | null;
    localeId?:   string | null;
    currencyId?: string | null;
    timezoneId?: string | null;
    createdAt:   string;
    updatedAt:   string;
};
