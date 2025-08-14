// src/types/checklist.ts

export type Checklist = {
    id:     string; // uuid
    userId: string; // uuid
    tripId: string;
    title:  string;
    createdAt: string; // timestamptz
    updatedAt: string; // timestamptz
};

export type ChecklistItem = {
    id:          string; // uuid
    checklistId: string; // uuid
    checkitemId: string;
    isChecked:   boolean;
    createdAt:   string; // timestamptz
    updatedAt:   string; // timestamptz
};

