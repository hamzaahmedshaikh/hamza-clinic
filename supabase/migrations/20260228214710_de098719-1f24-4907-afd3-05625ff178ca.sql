
-- Create get_receptionists function (like get_doctors)
CREATE OR REPLACE FUNCTION public.get_receptionists()
RETURNS TABLE(user_id uuid, name text, phone text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT p.user_id, p.name, p.phone
  FROM public.profiles p
  INNER JOIN public.user_roles r ON r.user_id = p.user_id
  WHERE r.role = 'receptionist'
  ORDER BY p.name
$$;

-- Fix all appointment policies to be permissive (drop restrictive ones and recreate)
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
CREATE POLICY "Authenticated users can view appointments"
ON public.appointments FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Patients can insert own appointments" ON public.appointments;
CREATE POLICY "Patients can insert own appointments"
ON public.appointments FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Staff can insert appointments" ON public.appointments;
CREATE POLICY "Staff can insert appointments"
ON public.appointments FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

DROP POLICY IF EXISTS "Staff can update appointments" ON public.appointments;
CREATE POLICY "Staff can update appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

DROP POLICY IF EXISTS "Admins can delete appointments" ON public.appointments;
CREATE POLICY "Admins can delete appointments"
ON public.appointments FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

-- Fix patient policies to be permissive
DROP POLICY IF EXISTS "Authenticated users can view patients" ON public.patients;
CREATE POLICY "Authenticated users can view patients"
ON public.patients FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Patients can create own patient profile" ON public.patients;
CREATE POLICY "Patients can create own patient profile"
ON public.patients FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Staff can insert patients" ON public.patients;
CREATE POLICY "Staff can insert patients"
ON public.patients FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

DROP POLICY IF EXISTS "Staff can update patients" ON public.patients;
CREATE POLICY "Staff can update patients"
ON public.patients FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

-- Fix diagnosis_logs policies
DROP POLICY IF EXISTS "Authenticated users can view diagnosis logs" ON public.diagnosis_logs;
CREATE POLICY "Authenticated users can view diagnosis logs"
ON public.diagnosis_logs FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Doctors can insert diagnosis logs" ON public.diagnosis_logs;
CREATE POLICY "Doctors can insert diagnosis logs"
ON public.diagnosis_logs FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role)
);

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Fix user_roles policies
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
