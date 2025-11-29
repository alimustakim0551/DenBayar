-- CRITICAL SECURITY FIX: Remove public access to sensitive user data

-- 1. DROP the dangerous public access policy on profiles
DROP POLICY IF EXISTS "Public can view approved profiles" ON public.profiles;

-- 2. DROP the profiles_public view entirely (it's exposing data without protection)
-- If you need a public view, recreate it with only non-sensitive fields and proper access control
DROP VIEW IF EXISTS public.profiles_public;

-- 3. FIX email_notifications - remove overly permissive policy
DROP POLICY IF EXISTS "email_notifications_service_role_insert" ON public.email_notifications;

-- Only service role can insert
CREATE POLICY "email_notifications_service_insert"
ON public.email_notifications
FOR INSERT
TO service_role
WITH CHECK (true);

-- 4. FIX notifications - prevent users from creating fake notifications
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

CREATE POLICY "Service role can create notifications"
ON public.notifications
FOR INSERT
TO service_role
WITH CHECK (true);

-- 5. CONSOLIDATE duplicate chat_rooms policies
DROP POLICY IF EXISTS "Users can view their own chat rooms" ON public.chat_rooms;

-- 6. CONSOLIDATE duplicate transactions policies  
DROP POLICY IF EXISTS "transactions_select_own" ON public.transactions;