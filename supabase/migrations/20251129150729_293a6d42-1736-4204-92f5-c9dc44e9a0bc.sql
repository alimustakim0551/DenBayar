-- FIX: Set search_path on all functions for security

ALTER FUNCTION public.log_admin_profile_access() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.sync_profile_role() SET search_path = public;
ALTER FUNCTION public.update_repayment_due_on_withdrawal() SET search_path = public;
ALTER FUNCTION public.prevent_sensitive_data_trigger() SET search_path = public;
ALTER FUNCTION public.handle_new_message() SET search_path = public;
ALTER FUNCTION public.send_welcome_email_on_signup() SET search_path = public;
ALTER FUNCTION public.send_transaction_email_notification() SET search_path = public;
ALTER FUNCTION public.get_next_user_serial() SET search_path = public;
ALTER FUNCTION public.has_role(uuid, app_role) SET search_path = public;
ALTER FUNCTION public.get_user_role(uuid) SET search_path = public;
ALTER FUNCTION public.get_current_user_role() SET search_path = public;
ALTER FUNCTION public.get_openrouter_api_key() SET search_path = public;
ALTER FUNCTION public.promote_user_to_admin(uuid) SET search_path = public;
ALTER FUNCTION public.update_openrouter_api_key(text, uuid) SET search_path = public;
ALTER FUNCTION public.process_deposit_with_repayment(uuid, numeric) SET search_path = public;
ALTER FUNCTION public.get_security_policies() SET search_path = public;
ALTER FUNCTION public.enhanced_sanitize_log_data(jsonb) SET search_path = public;
ALTER FUNCTION public.validate_safe_data(text) SET search_path = public;
ALTER FUNCTION public.sanitize_log_data(jsonb) SET search_path = public;
ALTER FUNCTION public.is_admin() SET search_path = public;
ALTER FUNCTION public.audit_sensitive_data() SET search_path = public;
ALTER FUNCTION public.log_admin_action(uuid, text, uuid, jsonb) SET search_path = public;
ALTER FUNCTION public.delete_user_completely(uuid) SET search_path = public;
ALTER FUNCTION public.send_broadcast_notification(text, text, text, text) SET search_path = public;