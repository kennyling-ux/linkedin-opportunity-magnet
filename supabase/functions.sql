-- Run this in Supabase SQL Editor AFTER schema.sql
-- These are helper RPC functions called by API routes

-- Add topup credits atomically
CREATE OR REPLACE FUNCTION add_topup_credits(p_user_id TEXT, p_credits INT)
RETURNS void AS $$
BEGIN
  INSERT INTO user_credits (user_id, topup_credits)
  VALUES (p_user_id, p_credits)
  ON CONFLICT (user_id)
  DO UPDATE SET
    topup_credits = user_credits.topup_credits + p_credits,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment an integer stored in app_config
CREATE OR REPLACE FUNCTION increment_app_config_int(config_key TEXT, increment_by INT)
RETURNS void AS $$
BEGIN
  UPDATE app_config
  SET value = (value::INT + increment_by)::TEXT
  WHERE key = config_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
