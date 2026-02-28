
-- Function to get all staff (non-patient users) for admin management
CREATE OR REPLACE FUNCTION public.get_all_staff()
RETURNS TABLE(user_id uuid, name text, phone text, role app_role)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT p.user_id, p.name, p.phone, r.role
  FROM public.profiles p
  INNER JOIN public.user_roles r ON r.user_id = p.user_id
  ORDER BY r.role, p.name
$$;

-- Function to update a user's role (admin only, enforced at app level + RLS)
CREATE OR REPLACE FUNCTION public.update_user_role(_target_user_id uuid, _new_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only allow admins
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can change roles';
  END IF;
  
  -- Prevent changing own role
  IF _target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot change your own role';
  END IF;

  UPDATE public.user_roles SET role = _new_role WHERE user_id = _target_user_id;
END;
$$;
