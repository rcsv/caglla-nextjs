// src/types/checklist.ts

export type Checklist = {
    id:     string;
    tripId: string;
    title:  string;
};

export type ChecklistItem = {
    id:          string;
    checklistId: string;
    checkitemId: string;
    isChecked:   boolean;
};

