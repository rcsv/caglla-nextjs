// src/types/itinerary.ts

export type Itinerary = {
    id: string;     // uuid
    dayId: string;  // uuid
    startTime: string; // timestamptz ISO 8601 format
    endTime?:  string | null; // timestamptz ISO 8601 format
    location?:  string | null;
    memo?:      string | null;
    activityId?:string | null; // Optional, if the itinerary is linked to an activity
    createdAt: string;  // timestamptz
    updatedAt: string;  // timestamptz
};

