-- ============================================================
-- Luminary Database Schema
-- Run this in Supabase SQL Editor (Project → SQL Editor → New query)
-- ============================================================

-- Users (mirrors Clerk, enriched with business data)
CREATE TABLE IF NOT EXISTS users (
  id                    TEXT PRIMARY KEY,  -- Clerk user_id
  email                 TEXT UNIQUE NOT NULL,
  name                  TEXT,
  country               TEXT,
  city                  TEXT,
  signup_source         TEXT,
  signup_bonus_claimed  BOOLEAN DEFAULT false,
  hitpay_customer_ref   TEXT,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  TEXT REFERENCES users(id) ON DELETE CASCADE,
  plan_type                TEXT CHECK (plan_type IN ('starter', 'agency')),
  billing_cycle            TEXT CHECK (billing_cycle IN ('monthly', 'annual')),
  status                   TEXT CHECK (status IN ('active', 'cancelled', 'past_due')) DEFAULT 'active',
  hitpay_subscription_id   TEXT,
  hitpay_payment_ref       TEXT,
  current_period_start     TIMESTAMPTZ,
  current_period_end       TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT now(),
  updated_at               TIMESTAMPTZ DEFAULT now()
);

-- Credits
CREATE TABLE IF NOT EXISTS user_credits (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     TEXT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  subscription_credits        INT DEFAULT 0,
  topup_credits               INT DEFAULT 0,
  lifetime_actions_this_month INT DEFAULT 0,
  last_reset_at               TIMESTAMPTZ DEFAULT now(),
  updated_at                  TIMESTAMPTZ DEFAULT now()
);

-- Credit Transactions (audit + analytics)
CREATE TABLE IF NOT EXISTS credit_transactions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT REFERENCES users(id) ON DELETE CASCADE,
  action_type  TEXT NOT NULL,
  credits_used INT NOT NULL,
  source       TEXT CHECK (source IN ('subscription', 'topup', 'signup_bonus', 'lifetime')),
  metadata     JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Lifetime Deals
CREATE TABLE IF NOT EXISTS lifetime_deals (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  hitpay_payment_ref  TEXT,
  purchased_at        TIMESTAMPTZ DEFAULT now(),
  is_active           BOOLEAN DEFAULT true
);

-- App Config (feature flags, counters)
CREATE TABLE IF NOT EXISTS app_config (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);

-- Seed config values
INSERT INTO app_config (key, value) VALUES
  ('lifetime_deal_count', '0'),
  ('lifetime_deal_cap', '200'),
  ('lifetime_deal_open', 'true'),
  ('lifetime_deal_deadline', '2025-09-30')
ON CONFLICT (key) DO NOTHING;

-- Analytics Events (behavioral tracking)
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT,
  session_id  TEXT,
  event_type  TEXT NOT NULL,
  properties  JSONB DEFAULT '{}',
  country     TEXT,
  city        TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits        ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifetime_deals      ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events    ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by API routes with service key)
-- Public anon key has no access — all reads/writes go through API routes

-- ============================================================
-- Indexes for performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id    ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_user_id        ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_created_at     ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id        ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type     ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at     ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_country        ON analytics_events(country);

-- ============================================================
-- Helper: auto-update updated_at timestamps
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_credits_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
