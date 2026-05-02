"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/CopyButton";
import { Zap, FileText, RefreshCw, BookmarkPlus, Bookmark } from "lucide-react";
import { toast } from "sonner";
import type { PostTone, PostTopic } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useIsPro, ProGate } from "@/components/PaywallGate";

export default function ContentPage() {
  const { input, topics, setTopics, drafts, addDraft, removeDraft, analysis } = useApp();
  const router = useRouter();
  const { t } = useLanguage();
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [tone, setTone] = useState<PostTone>("professional");
  const [selectedTopic, setSelectedTopic] = useState<PostTopic | null>(null);
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const isPro = useIsPro();

  if (!analysis) { router.replace("/analyze"); return null; }
  if (isPro === null) return null;
  if (!isPro) return <ProGate feature="Content Engine" desc="Generate 30 tailored topic ideas and AI-written posts in your tone of voice." />;

  const toneOptions: { value: PostTone; label: string; desc: string }[] = [
    { value: "professional", label: t("tonePro"), desc: t("toneProDesc") },
    { value: "educational", label: t("toneEdu"), desc: t("toneEduDesc") },
    { value: "viral", label: t("toneViral"), desc: t("toneViralDesc") },
    { value: "engagement", label: t("toneEngage"), desc: t("toneEngageDesc") },
  ];

  const engagementConfig = {
    high: { label: t("engHigh"), color: "bg-blue-100 text-blue-700" },
    medium: { label: t("engMedium"), color: "bg-amber-100 text-amber-700" },
    standard: { label: t("engStandard"), color: "bg-slate-100 text-slate-600" },
  };

  async function generateTopics() {
    if (!input) return;
    setLoadingTopics(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTopics(data.topics);
      toast.success(t("successTopics"));
    } catch {
      toast.error(t("errGenFail"));
    } finally {
      setLoadingTopics(false);
    }
  }

  async function generatePost(topic: PostTopic) {
    if (!input) return;
    setGeneratingId(topic.id);
    setSelectedTopic(topic);
    setGeneratedPost("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          action: "generate-post",
          topicTitle: topic.title,
          topicAngle: topic.angle,
          tone,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGeneratedPost(data.content);
      toast.success(t("successPost"));
    } catch {
      toast.error(t("errGenFail"));
    } finally {
      setGeneratingId(null);
    }
  }

  function saveDraft() {
    if (!selectedTopic || !generatedPost) return;
    addDraft({ topicId: selectedTopic.id, content: generatedPost, tone, isDraft: true });
    toast.success(t("successDraft"));
  }

  const isDraft = (id: string) => drafts.some((d) => d.topicId === id);

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("contentEngineTitle")}</h1>
            <p className="text-slate-500 text-sm">{t("contentEngineSub")}</p>
          </div>
        </div>
        {topics.length > 0 && (
          <Button variant="outline" size="sm" onClick={generateTopics} disabled={loadingTopics} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />{t("regenerate")}
          </Button>
        )}
      </div>

      {/* Tone selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-slate-700 shrink-0">{t("toneLabel")}</span>
        {toneOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTone(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              tone === opt.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
            }`}
          >
            {opt.label}
            <span className={`ml-1.5 text-xs ${tone === opt.value ? "text-indigo-200" : "text-slate-400"}`}>
              {opt.desc}
            </span>
          </button>
        ))}
      </div>

      {topics.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-4">
          <p className="text-slate-600">{t("genTopicsDesc")}</p>
          <Button onClick={generateTopics} disabled={loadingTopics} className="bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-8">
            {loadingTopics ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />{t("generating")}</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" />{t("genTopicsBtn")}</>
            )}
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-6">
          {/* Topics list */}
          <div className="md:col-span-2 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {t("topicsCount")}（{topics.length}）
            </p>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {topics.map((topic) => {
                const eg = engagementConfig[topic.estimatedEngagement];
                const draft = isDraft(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setGeneratedPost(""); }}
                    className={`border rounded-lg p-3.5 cursor-pointer transition-all ${
                      selectedTopic?.id === topic.id
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="text-sm font-medium text-slate-800 leading-snug">{topic.title}</p>
                      {draft && <Bookmark className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-xs text-slate-500 mb-2 leading-snug">{topic.angle}</p>
                    <Badge className={`text-xs ${eg.color}`}>{eg.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Post generator */}
          <div className="md:col-span-3 space-y-4">
            {selectedTopic ? (
              <>
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t("selectedTopic")}</p>
                  <p className="font-semibold text-slate-800">{selectedTopic.title}</p>
                  <p className="text-sm text-slate-500">{selectedTopic.angle}</p>
                  <Button
                    onClick={() => generatePost(selectedTopic)}
                    disabled={generatingId === selectedTopic.id}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {generatingId === selectedTopic.id ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />{t("generating")}</>
                    ) : (
                      <><Zap className="w-4 h-4 mr-2" />{t("genPostBtn")}</>
                    )}
                  </Button>
                </div>

                {generatedPost && (
                  <div className="bg-white rounded-xl border border-indigo-200 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{t("generatedPost")}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={saveDraft} className="gap-1.5 text-xs">
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          {isDraft(selectedTopic.id) ? t("updateDraft") : t("saveDraft")}
                        </Button>
                        <CopyButton text={generatedPost} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{generatedPost}</p>
                  </div>
                )}

                {/* Saved drafts */}
                {drafts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {t("savedDrafts")}（{drafts.length}）
                    </p>
                    {drafts.map((draft) => {
                      const tp = topics.find((tp) => tp.id === draft.topicId);
                      return (
                        <div key={draft.topicId} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-600">{tp?.title}</p>
                            <div className="flex gap-2">
                              <CopyButton text={draft.content} />
                              <Button variant="ghost" size="sm" onClick={() => removeDraft(draft.topicId)} className="text-xs text-slate-400 h-7 px-2">
                                {t("delete")}
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">{draft.content}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-400 text-sm">
                {t("selectTopicHint")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
