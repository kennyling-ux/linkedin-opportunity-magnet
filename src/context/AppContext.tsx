"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AppState, LinkedInInput, AnalysisResult, ProfileOptimization, PostTopic, GeneratedPost, CredibilityAnalysis, PositioningAdvice } from "@/types";

const STORAGE_KEY = "opportunity_magnet_state";

const defaultState: AppState = {
  input: null,
  analysis: null,
  profile: null,
  topics: [],
  drafts: [],
  credibility: null,
  positioning: null,
  isAnalyzing: false,
};

interface AppContextValue extends AppState {
  setInput: (input: LinkedInInput) => void;
  setAnalysis: (result: AnalysisResult) => void;
  setProfile: (profile: ProfileOptimization) => void;
  setTopics: (topics: PostTopic[]) => void;
  addDraft: (draft: GeneratedPost) => void;
  removeDraft: (topicId: string) => void;
  setCredibility: (data: CredibilityAnalysis) => void;
  setPositioning: (data: PositioningAdvice) => void;
  setIsAnalyzing: (v: boolean) => void;
  reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...defaultState, ...JSON.parse(saved), isAnalyzing: false });
    } catch {}
  }, []);

  function persist(next: Partial<AppState>) {
    setState((prev) => {
      const updated = { ...prev, ...next };
      try {
        const { isAnalyzing: _, ...toStore } = updated;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch {}
      return updated;
    });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setInput: (input) => persist({ input }),
        setAnalysis: (analysis) => persist({ analysis }),
        setProfile: (profile) => persist({ profile }),
        setTopics: (topics) => persist({ topics }),
        addDraft: (draft) =>
          persist({ drafts: [...state.drafts.filter((d) => d.topicId !== draft.topicId), draft] }),
        removeDraft: (topicId) =>
          persist({ drafts: state.drafts.filter((d) => d.topicId !== topicId) }),
        setCredibility: (credibility) => persist({ credibility }),
        setPositioning: (positioning) => persist({ positioning }),
        setIsAnalyzing: (isAnalyzing) => setState((p) => ({ ...p, isAnalyzing })),
        reset: () => {
          if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
          setState(defaultState);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
