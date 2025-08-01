// src/types/profile.ts

export type Profile = {

    id:          string;
    user_id:     string;
    nickname?:   string | null;
    localeId?:   string | null;
    currencyId?: string | null;
    timezoneId?: string | null;
    createdAt: string;
    updatedAt: string;
};
