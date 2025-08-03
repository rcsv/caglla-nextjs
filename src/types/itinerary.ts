// src/types/itinerary.ts

export type Itinerary = {
    id: string;
    dayId: string;
    startTime: string; // ISO 8601 format
    endTime?:  string | null; // ISO 8601 format
    location?:  string | null;
    memo?:      string | null;
    activityId?:string | null; // Optional, if the itinerary is linked to an activity
    createdAt: string;
    updatedAt: string;
};

