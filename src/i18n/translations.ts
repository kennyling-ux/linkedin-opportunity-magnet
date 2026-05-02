export type Lang = "zh" | "en";

export const translations = {
  // ── Common ──────────────────────────────────────────────────────
  brand: { zh: "Luminary", en: "Luminary" },
  tagline: { zh: "Gemini AI · 個人品牌優化系統", en: "Gemini AI · Personal Brand Optimizer" },
  startAnalysis: { zh: "免費開始分析", en: "Start Free Analysis" },
  reanalyze: { zh: "重新分析", en: "Re-analyze" },
  copy: { zh: "複製", en: "Copy" },
  copied: { zh: "已複製", en: "Copied" },
  generate: { zh: "生成", en: "Generate" },
  generating: { zh: "生成中...", en: "Generating..." },
  regenerate: { zh: "重新生成", en: "Regenerate" },
  save: { zh: "儲存草稿", en: "Save Draft" },
  delete: { zh: "刪除", en: "Delete" },
  analyzing: { zh: "AI 分析中，請稍候...", en: "AI analyzing, please wait..." },
  noData: { zh: "尚無資料，請先完成分析。", en: "No data yet. Please complete an analysis first." },

  // ── Opportunity levels ───────────────────────────────────────────
  opportunityLabel: { zh: "被機會找上的機率", en: "Opportunity Attraction" },
  oppLow: { zh: "低", en: "Low" },
  oppMedium: { zh: "中", en: "Med" },
  oppHigh: { zh: "高", en: "High" },
  improvementsTitle: { zh: "立即改善方式", en: "How to Improve" },

  // ── Score grades ─────────────────────────────────────────────────
  gradeGreat: { zh: "良好", en: "Great" },
  gradeOk: { zh: "待改善", en: "Fair" },
  gradePoor: { zh: "不足", en: "Poor" },
  gradeBad: { zh: "需加強", en: "Weak" },

  // ── Nav items ────────────────────────────────────────────────────
  navDashboard: { zh: "Dashboard", en: "Dashboard" },
  navProfile: { zh: "Profile Engine", en: "Profile Engine" },
  navContent: { zh: "Content Engine", en: "Content Engine" },
  navCredibility: { zh: "Credibility", en: "Credibility" },
  navScores: { zh: "Scores & Positioning", en: "Scores & Positioning" },

  // ── Global nav / UI labels ───────────────────────────────────────
  navPricing:       { zh: "定價", en: "Pricing" },
  navBlog:          { zh: "部落格", en: "Blog" },
  navSignIn:        { zh: "登入", en: "Sign in" },
  navTryFree:       { zh: "免費試用", en: "Try Free" },
  navAnalyze:       { zh: "分析", en: "Analyze" },
  freeBadge:        { zh: "免費", en: "Free" },
  proBadge:         { zh: "Pro", en: "Pro" },
  seePricing:       { zh: "查看方案", en: "See pricing" },
  analyzeFreeBtn:   { zh: "免費分析", en: "Analyze free" },
  viewAllPlans:     { zh: "查看所有方案", en: "View all plans" },
  sidebarUpgrade:   { zh: "升級為 Pro", en: "Upgrade to Pro" },
  sidebarUnlock:    { zh: "解鎖所有引擎", en: "Unlock all engines" },

  // ── Landing page ─────────────────────────────────────────────────
  // Stats bar
  stat1Val:   { zh: "2,400+", en: "2,400+" },
  stat1Label: { zh: "個人檔案已分析", en: "Profiles analyzed" },
  stat2Val:   { zh: "3×", en: "3×" },
  stat2Label: { zh: "平均頁面瀏覽提升", en: "Avg. profile view increase" },
  stat3Val:   { zh: "94%", en: "94%" },
  stat3Label: { zh: "找到新機會", en: "Found new opportunities" },
  stat4Val:   { zh: "< 60s", en: "< 60s" },
  stat4Label: { zh: "取得評分", en: "To get your score" },

  // Hero badges & trust
  aiBadge:       { zh: "AI 驅動的 LinkedIn 優化工具", en: "AI-Powered LinkedIn Optimizer" },
  trustFreeStart: { zh: "免費開始", en: "Free to start" },

  // Section headers
  sectionHowItWorks:    { zh: "使用方法", en: "How it works" },
  sectionHowItWorksSub: { zh: "從貼上到洞察，60 秒搞定", en: "From paste to insights in 60 seconds" },
  sectionWhatYouGet:    { zh: "你能獲得什麼", en: "What you get" },
  sectionTestimonials:     { zh: "用戶評價", en: "What people say" },
  sectionTestimonialsSub:  { zh: "真實專業人士的真實成果", en: "Real results from real professionals" },

  // Feature tags
  tagVisibility:  { zh: "曝光度評分", en: "Visibility Score" },
  tagPositioning: { zh: "定位引擎", en: "Positioning Engine" },
  tagContent:     { zh: "內容引擎", en: "Content Engine" },
  tagCredibility: { zh: "可信度引擎", en: "Credibility Engine" },

  // Hero product preview labels
  previewOppLevel:       { zh: "機會吸引力", en: "Opportunity Level" },
  previewMedium:         { zh: "中等", en: "Medium" },
  previewTopImprov:      { zh: "主要改善項目", en: "Top improvements" },
  previewImp1:           { zh: "在工作經歷中加入量化成果", en: "Add quantified results to experience" },
  previewImp2:           { zh: "重寫 Headline 鎖定特定受眾", en: "Rewrite headline to target specific audience" },
  previewImp3:           { zh: "索取 3 封推薦信", en: "Request 3 recommendations" },

  // Pricing teaser
  pricingTeaserBadge:  { zh: "免費開始", en: "Free to start" },
  pricingTeaserTitle:  { zh: "免費開始。準備好了再升級。", en: "Start free. Upgrade when you're ready." },
  pricingTeaserSub:    { zh: "整體評分和缺口摘要永遠免費。升級 Pro 解鎖 AI 重寫、貼文生成和職涯定位。", en: "Your overall score and gap summary are always free. Upgrade to Pro to unlock AI-generated rewrites, post ideas, and career positioning." },
  featureOverallScore: { zh: "整體評分", en: "Overall score" },
  featureGapAnalysis:  { zh: "缺口分析", en: "Gap analysis" },
  featureAIProfile:    { zh: "AI 個人檔案重寫", en: "AI profile rewrite" },
  featurePostGen:      { zh: "貼文生成器", en: "Post generator" },
  featureCaseStudy:    { zh: "案例研究生成器", en: "Case study builder" },

  // CTA section
  ctaJoin: { zh: "加入 2,400+ 位已優化個人檔案的專業人士", en: "Join 2,400+ professionals who've optimized their profiles" },

  // Footer
  footerNoData: { zh: "資料不儲存", en: "No data stored" },

  heroTitle1: { zh: "讓 LinkedIn", en: "Turn LinkedIn Into" },
  heroTitle2: { zh: "主動吸引機會", en: "an Luminary" },
  heroSub: {
    zh: "不只是內容生成工具。分析你的定位缺口，給出可立即執行的優化路徑，讓工作機會、客戶與合作自動找上你。",
    en: "More than a content generator. Analyze your positioning gaps and get an actionable optimization roadmap — so jobs, clients, and partnerships find you.",
  },
  heroDisclaimer: { zh: "無需帳號 · 資料不儲存 · 30 秒出結果", en: "No account · Data not stored · Results in 30s" },
  step1: { zh: "貼上 LinkedIn 個人頁面內容", en: "Paste your LinkedIn profile content" },
  step2: { zh: "AI 自動評分與缺口分析", en: "AI scores and gap analysis" },
  step3: { zh: "查看三大維度評分與建議", en: "Review scores across 3 dimensions" },
  step4: { zh: "逐步優化並一鍵複製成果", en: "Optimize step-by-step and copy results" },
  featuresTitle: { zh: "四大引擎，系統化提升", en: "Four Engines. Systematic Growth." },
  featuresSub: { zh: "從分析到執行一條龍，每個模組都有具體可複製的輸出", en: "End-to-end from analysis to execution — every module delivers copy-ready output" },
  ctaTitle: { zh: "準備好讓機會主動找你了嗎？", en: "Ready to attract opportunities?" },
  ctaSub: { zh: "貼上你的 LinkedIn 內容，30 秒內取得完整分析報告。不需要帳號，完全免費。", en: "Paste your LinkedIn content and get a full analysis in 30 seconds. No account needed, completely free." },
  ctaBtn: { zh: "立即開始分析", en: "Start Analysis Now" },
  footerNote: { zh: "所有資料均由使用者手動提供，AI 僅負責分析與建議", en: "All data is manually provided by the user. AI handles analysis and recommendations only." },
  f1Title: { zh: "AI 評分系統", en: "AI Scoring System" },
  f1Desc: { zh: "曝光度、可信度、定位清晰度三維評分，精準定位你的瓶頸，而非泛泛建議。", en: "Three-dimension scoring: visibility, credibility, and positioning — pinpoints your exact bottlenecks." },
  f2Title: { zh: "Profile Engine", en: "Profile Engine" },
  f2Desc: { zh: "3 種風格 Headline、About 重寫、Experience 量化，附一鍵複製。原始 vs 優化左右對照。", en: "3-style headlines, About rewrite, quantified Experience — with one-click copy and before/after comparison." },
  f3Title: { zh: "Content Engine", en: "Content Engine" },
  f3Desc: { zh: "30 個專屬主題，4 種語氣風格，直接生成完整 LinkedIn 貼文，可儲存草稿。", en: "30 tailored topics, 4 tone styles — generate complete LinkedIn posts and save drafts." },
  f4Title: { zh: "Credibility Engine", en: "Credibility Engine" },
  f4Desc: { zh: "將工作經歷轉化為顧問等級案例研究，識別缺失的信任證據與建議人脈。", en: "Transform work history into consultant-grade case studies. Identify missing trust evidence and network gaps." },

  // ── Analyze page ─────────────────────────────────────────────────
  analyzeTitle: { zh: "分析你的 LinkedIn", en: "Analyze Your LinkedIn" },
  analyzeSub: { zh: "貼上個人頁面內容，AI 在 30 秒內給出完整評分與優化建議。", en: "Paste your profile content and get full scores and optimization advice in 30 seconds." },
  trustNoStore: { zh: "資料不儲存", en: "Data not stored" },
  trust30s: { zh: "約 30 秒", en: "~30 seconds" },
  trustFree: { zh: "完全免費", en: "Completely free" },
  contentLabel: { zh: "LinkedIn 個人頁面內容", en: "LinkedIn Profile Content" },
  contentPlaceholder: {
    zh: "貼上你的 LinkedIn About、工作經歷、技能等區塊...\n\n例：\nAbout: 我是一位有 5 年經驗的產品經理...\nExperience: Senior PM at TechCorp...\nSkills: Product Strategy, Agile...",
    en: "Paste your LinkedIn About, Experience, Skills sections here...\n\nExample:\nAbout: I'm a product manager with 5 years of SaaS experience...\nExperience: Senior PM at TechCorp...\nSkills: Product Strategy, Agile...",
  },
  contentHint: { zh: "請從 LinkedIn 手動複製貼上，系統不會自動爬取任何資料", en: "Manually copy-paste from LinkedIn — the system does not scrape any data automatically" },
  industryLabel: { zh: "所屬產業", en: "Industry" },
  industryOptional: { zh: "選填", en: "optional" },
  industryPlaceholder: { zh: "SaaS、金融科技、顧問...", en: "SaaS, FinTech, Consulting..." },
  targetLabel: { zh: "目標職位或受眾", en: "Target Role or Audience" },
  targetPlaceholder: { zh: "CTO、新創創辦人、B2B 客戶...", en: "CTO, startup founder, B2B clients..." },
  urlLabel: { zh: "LinkedIn 個人頁面連結", en: "LinkedIn Profile URL" },
  urlPlaceholder: { zh: "https://www.linkedin.com/in/yourprofile", en: "https://www.linkedin.com/in/yourprofile" },
  fetchBtn: { zh: "自動載入", en: "Auto-fetch" },
  fetching: { zh: "載入中...", en: "Fetching..." },
  fetchSuccess: { zh: "個人頁面已載入，可直接編輯後送出", en: "Profile loaded — review and edit before submitting" },
  fetchErrPrivate: { zh: "此 LinkedIn 個人頁面為私人或無法存取", en: "This LinkedIn profile is private or inaccessible" },
  fetchErrNotFound: { zh: "找不到此個人頁面，請確認連結是否正確", en: "Profile not found — please check the URL" },
  fetchErrGeneral: { zh: "載入失敗，請改為手動貼上內容", en: "Fetch failed — please paste your content manually" },
  fetchedBadge: { zh: "已自動載入", en: "Auto-fetched" },
  submitBtn: { zh: "開始分析", en: "Start Analysis" },
  tooShort: { zh: "內容太短，請貼上更完整的資訊（還需要", en: "Content too short — need" },
  tooShortSuffix: { zh: "個字元）", en: "more characters" },
  errTooShort: { zh: "內容太短，請貼上更完整的個人頁面資訊（建議 300 字以上）", en: "Content too short. Please paste more complete profile info (300+ chars recommended)." },
  errEmpty: { zh: "請貼上你的 LinkedIn 個人頁面內容", en: "Please paste your LinkedIn profile content" },
  errFail: { zh: "分析失敗，請稍後重試", en: "Analysis failed, please try again" },
  successAnalysis: { zh: "分析完成！", en: "Analysis complete!" },

  // ── Dashboard ────────────────────────────────────────────────────
  dashTitle: { zh: "Dashboard", en: "Dashboard" },
  dashTarget: { zh: "目標：", en: "Target: " },
  dashGaps: { zh: "個優化點", en: "optimization points" },
  scoresSection: { zh: "綜合評分", en: "Overall Scores" },
  scoreTotal: { zh: "總分", en: "Total" },
  scoreVisibility: { zh: "曝光度", en: "Visibility" },
  scoreCredibility: { zh: "可信度", en: "Credibility" },
  scorePositioning: { zh: "定位清晰度", en: "Positioning" },
  gapSection: { zh: "缺口分析", en: "Gap Analysis" },
  gapItems: { zh: "個待改善項目", en: "items to improve" },
  gapMissing: { zh: "缺少的關鍵元素", en: "Missing key elements" },
  gapContent: { zh: "內容策略缺口", en: "Content strategy gaps" },
  gapVisibility: { zh: "曝光度問題", en: "Visibility issues" },
  gapCredibility: { zh: "可信度問題", en: "Credibility issues" },
  gapMore: { zh: "個更多...", en: " more..." },
  aiSection: { zh: "AI 建議定位", en: "AI Positioning Advice" },
  suggestedIndustry: { zh: "建議產業", en: "Suggested Industry" },
  suggestedRoles: { zh: "建議目標職位 / 受眾", en: "Suggested Target Roles / Audience" },
  modulesSection: { zh: "優化模組", en: "Optimization Modules" },
  mod1Desc: { zh: "Headline · About · Experience 重寫", en: "Headline · About · Experience rewrite" },
  mod2Desc: { zh: "30 個貼文主題 · 完整貼文生成", en: "30 post topics · Full post generation" },
  mod3Desc: { zh: "案例研究 · 信任證據缺口分析", en: "Case studies · Trust evidence gaps" },
  mod4Desc: { zh: "詳細評分 · AI 職涯方向建議", en: "Detailed scores · AI career direction" },

  // ── Profile Engine ───────────────────────────────────────────────
  profileTitle: { zh: "Profile Engine", en: "Profile Engine" },
  profileSub: { zh: "AI 優化你的 Headline、About 與 Experience", en: "AI-optimized Headline, About, and Experience" },
  profileGenSub: { zh: "完整優化版本已生成", en: "Full optimization ready" },
  profileGenBtn: { zh: "生成 Profile 優化內容", en: "Generate Profile Optimizations" },
  profileGenDesc: { zh: "點擊下方按鈕，AI 將生成 3 種 Headline 風格、優化 About 區塊並重寫 Experience。", en: "Click below — AI will generate 3 headline styles, rewrite your About, and optimize each Experience entry." },
  headlineSection: { zh: "Headline 優化版本", en: "Headline Variations" },
  styleAuthority: { zh: "權威型", en: "Authority" },
  styleOutcome: { zh: "成果型", en: "Outcome" },
  styleNiche: { zh: "利基型", en: "Niche" },
  styleAuthorityDesc: { zh: "建立專業地位", en: "Establishes expertise" },
  styleOutcomeDesc: { zh: "強調對他人的價值", en: "Focuses on results for others" },
  styleNicheDesc: { zh: "超精準定位", en: "Super-specific positioning" },
  aboutSection: { zh: "About 區塊", en: "About Section" },
  original: { zh: "原始版本", en: "Original" },
  optimized: { zh: "優化版本", en: "Optimized" },
  experienceSection: { zh: "Experience 重寫", en: "Experience Rewrite" },
  keywordsSection: { zh: "關鍵字優化清單", en: "Keyword Optimization List" },
  keywordsHint: { zh: "將這些關鍵字自然融入你的 Headline、About 與 Experience 中，提升搜尋曝光。", en: "Naturally incorporate these keywords into your Headline, About, and Experience to boost searchability." },

  // ── Content Engine ───────────────────────────────────────────────
  contentEngineTitle: { zh: "Content Engine", en: "Content Engine" },
  contentEngineSub: { zh: "30 個專屬主題 · 完整貼文生成", en: "30 tailored topics · Full post generation" },
  toneLabel: { zh: "貼文語氣風格：", en: "Post tone:" },
  tonePro: { zh: "專業", en: "Professional" },
  toneProDesc: { zh: "正式洞見", en: "Formal insights" },
  toneEdu: { zh: "教學", en: "Educational" },
  toneEduDesc: { zh: "分享知識", en: "Share knowledge" },
  toneViral: { zh: "爆款", en: "Viral" },
  toneViralDesc: { zh: "強烈觀點", en: "Strong opinion" },
  toneEngage: { zh: "高互動", en: "Engagement" },
  toneEngageDesc: { zh: "提問討論", en: "Q&A discussion" },
  genTopicsBtn: { zh: "生成 30 個貼文主題", en: "Generate 30 Post Topics" },
  genTopicsDesc: { zh: "AI 將根據你的領域與背景生成 30 個高潛力貼文主題。", en: "AI will generate 30 high-potential post topics tailored to your expertise and background." },
  topicsCount: { zh: "貼文主題", en: "Post Topics" },
  engHigh: { zh: "高互動潛力", en: "High Engagement" },
  engMedium: { zh: "中等互動", en: "Medium Engagement" },
  engStandard: { zh: "標準", en: "Standard" },
  selectedTopic: { zh: "選取主題", en: "Selected Topic" },
  genPostBtn: { zh: "生成完整貼文", en: "Generate Full Post" },
  generatedPost: { zh: "生成的貼文", en: "Generated Post" },
  updateDraft: { zh: "更新草稿", en: "Update Draft" },
  saveDraft: { zh: "儲存草稿", en: "Save Draft" },
  savedDrafts: { zh: "已儲存草稿", en: "Saved Drafts" },
  selectTopicHint: { zh: "從左側選擇一個主題來生成完整貼文", en: "Select a topic on the left to generate a full post" },
  successTopics: { zh: "30 個主題已生成！", en: "30 topics generated!" },
  successPost: { zh: "貼文生成完成！", en: "Post generated!" },
  successDraft: { zh: "已儲存至草稿", en: "Saved to drafts" },

  // ── Credibility Engine ───────────────────────────────────────────
  credTitle: { zh: "Credibility Engine", en: "Credibility Engine" },
  credSub: { zh: "將你的專案轉化為顧問等級案例研究", en: "Transform your work into consultant-grade case studies" },
  credGenSub: { zh: "個案例研究已生成", en: "case studies generated" },
  credGenBtn: { zh: "生成 Credibility 分析", en: "Generate Credibility Analysis" },
  credGenDesc: { zh: "AI 將從你的工作經歷中提取 2-3 個案例，重新框架為高說服力的案例研究，並分析你缺少的信任證據。", en: "AI extracts 2-3 cases from your experience, reframes them as high-impact case studies, and identifies missing trust evidence." },
  caseStudies: { zh: "案例研究", en: "Case Studies" },
  csBackground: { zh: "背景", en: "Background" },
  csProblem: { zh: "問題", en: "Problem" },
  csSolution: { zh: "解法", en: "Solution" },
  csProcess: { zh: "流程", en: "Process" },
  csResults: { zh: "結果", en: "Results" },
  csMetrics: { zh: "關鍵指標", en: "Key Metrics" },
  missingEvidence: { zh: "缺少的證據", en: "Missing Evidence" },
  contentToAdd: { zh: "應該補強的內容", en: "Content to Add" },
  suggestedConnections: { zh: "建議建立的人脈", en: "Suggested Connections" },
  successCred: { zh: "Credibility 分析完成！", en: "Credibility analysis complete!" },

  // ── Scores & Positioning ─────────────────────────────────────────
  scoresTitle: { zh: "Scores & Positioning", en: "Scores & Positioning" },
  scoresSub: { zh: "詳細評分解析 + AI 職涯定位建議", en: "Detailed score breakdown + AI career positioning" },
  overallHealth: { zh: "整體 LinkedIn 健康度", en: "Overall LinkedIn Health" },
  overallHealthSub: { zh: "基於曝光度（30%）、可信度（35%）、定位清晰度（35%）加權計算", en: "Weighted score: Visibility (30%) · Credibility (35%) · Positioning (35%)" },
  detailedScores: { zh: "詳細評分", en: "Detailed Scores" },
  improvement: { zh: "改善建議", en: "Improvement Tips" },
  gradeGood: { zh: "良好", en: "Good" },
  gradeImprove: { zh: "待改善", en: "Needs work" },
  gradeWeak: { zh: "需加強", en: "Weak" },
  aiPositioning: { zh: "AI 定位建議", en: "AI Positioning Advice" },
  posGenBtn: { zh: "生成 AI 定位建議", en: "Generate AI Positioning" },
  posGenDesc: { zh: "AI 將根據你的完整背景，建議最適合的職涯方向、目標市場與內容策略。", en: "AI analyzes your full background to suggest the best career directions, target markets, and content strategy." },
  careerDirections: { zh: "最適合的 3 個職涯方向", en: "Top 3 Career Directions" },
  targetMarkets: { zh: "建議主打市場與受眾", en: "Suggested Target Markets" },
  skillsToStrengthen: { zh: "建議強化的技能", en: "Skills to Strengthen" },
  contentDirections: { zh: "建議的內容方向", en: "Suggested Content Pillars" },
  successPos: { zh: "定位分析完成！", en: "Positioning analysis complete!" },
  visibilityLabel: { zh: "曝光度（Visibility）", en: "Visibility" },
  credibilityLabel: { zh: "可信度（Credibility）", en: "Credibility" },
  positioningLabel: { zh: "定位清晰度（Positioning）", en: "Positioning" },
  visibilityDesc: {
    zh: "衡量你的 LinkedIn 在搜尋中被找到的機率。包含關鍵字密度、個人頁面完整度與 Headline 強度。",
    en: "Measures how discoverable your LinkedIn is. Includes keyword density, profile completeness, and headline strength.",
  },
  credibilityDesc: {
    zh: "衡量訪客對你能力的信任程度。包含量化成就、社交認證與案例研究。",
    en: "Measures how much visitors trust your capabilities. Includes quantified achievements, social proof, and case studies.",
  },
  positioningDesc: {
    zh: "衡量你的獨特價值主張是否清晰。訪客在 10 秒內是否能理解你是誰、能幫誰解決什麼問題。",
    en: "Measures the clarity of your unique value proposition. Can a visitor understand who you help and how — within 10 seconds?",
  },
  visTips: {
    zh: ["在 Headline 和 About 中加入目標職位的核心關鍵字", "完成所有個人頁面區塊（技能、推薦、作品集）", "自訂 LinkedIn 個人頁面 URL"],
    en: ["Add target role keywords in your Headline and About", "Complete all profile sections (Skills, Recommendations, Portfolio)", "Customize your LinkedIn profile URL"],
  },
  credTips: {
    zh: ["為每段工作經歷加入具體數字（%、金額、人數）", "向前同事或客戶索取推薦信", "新增作品集連結或案例研究文章"],
    en: ["Add specific numbers to each role (%, revenue, headcount)", "Request recommendations from former colleagues or clients", "Add portfolio links or case study articles"],
  },
  posTips: {
    zh: ["在 Headline 中明確說明你服務的對象與成果", "在 About 開頭直接說明你的核心定位", "選擇一個主要的利基方向，避免過度分散"],
    en: ["State who you serve and what outcome you deliver in the Headline", "Lead with your core positioning in the first line of About", "Choose one primary niche — avoid spreading too thin"],
  },

  // ── ProGate strings ──────────────────────────────────────────────
  proGateUpgrade: { zh: "升級為 Pro", en: "Upgrade to Pro" },
  proGateSignIn: { zh: "已有 Pro？", en: "Already have Pro?" },
  proGateSignInLink: { zh: "登入", en: "Sign in" },
  proGateScoresDesc: { zh: "查看完整 4 維度分析報告，以及 AI 職涯定位建議。", en: "See your full 4-dimension breakdown and get AI career direction advice." },
  proGateProfileDesc: { zh: "生成 AI 優化的 Headline、About 區塊與 Experience 重寫。", en: "Generate AI-written headline variants, an optimized About section, and experience rewrites." },
  proGateContentDesc: { zh: "生成 30 個專屬貼文主題，以及你語氣風格的 AI 完整貼文。", en: "Generate 30 tailored topic ideas and AI-written posts in your tone of voice." },
  proGateCredDesc: { zh: "從工作經歷中提取 AI 撰寫的案例研究，並識別可信度缺口。", en: "Extract AI-written case studies from your experience and identify credibility gaps." },

  // ── Error/success toasts ─────────────────────────────────────────
  errGenFail: { zh: "生成失敗，請重試", en: "Generation failed, please retry" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  const val = entry[lang];
  return typeof val === "string" ? val : (val as unknown as string[])[0];
}

export function tArr(key: TranslationKey, lang: Lang): string[] {
  const entry = translations[key];
  if (!entry) return [];
  const val = entry[lang];
  return Array.isArray(val) ? [...(val as unknown as string[])] : [val as string];
}
