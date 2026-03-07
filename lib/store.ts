import { create } from "zustand";

interface ResumeState {
    resume: any;
    setResume: (resume: any) => void;
    updateSection: (section: string, value: any) => void;
    updateNestedField: (section: string, field: string, value: any) => void;
    addItem: (section: string, item: any) => void;
    updateItem: (section: string, index: number, value: any) => void;
    deleteItem: (section: string, index: number) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
    resume: null,
    setResume: (resume) => set({ resume }),
    updateSection: (section, value) =>
        set((state) => ({
            resume: { ...state.resume, [section]: value }
        })),
    updateNestedField: (section, field, value) =>
        set((state) => ({
            resume: {
                ...state.resume,
                [section]: {
                    ...state.resume[section],
                    [field]: value,
                },
            },
        })),
    addItem: (section, item) =>
        set((state) => ({
            resume: {
                ...state.resume,
                [section]: [...(state.resume[section] || []), item],
            },
        })),
    updateItem: (section, index, value) =>
        set((state) => {
            const newList = [...(state.resume[section] || [])];
            newList[index] = value;
            return {
                resume: { ...state.resume, [section]: newList },
            };
        }),
    deleteItem: (section, index) =>
        set((state) => ({
            resume: {
                ...state.resume,
                [section]: state.resume[section].filter((_: any, i: number) => i !== index),
            },
        })),
    loading: true,
    setLoading: (loading) => set({ loading }),
}));
