
-- Allow receptionist to delete patients
DROP POLICY IF EXISTS "Admins can delete patients" ON public.patients;
CREATE POLICY "Admins and receptionists can delete patients"
ON public.patients FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'receptionist'::app_role)
);

-- Fix prescriptions insert policy - recreate as PERMISSIVE
DROP POLICY IF EXISTS "Doctors can insert prescriptions" ON public.prescriptions;
CREATE POLICY "Doctors can insert prescriptions"
ON public.prescriptions FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role)
);

-- Fix prescriptions select policy - ensure permissive
DROP POLICY IF EXISTS "Authenticated users can view prescriptions" ON public.prescriptions;
CREATE POLICY "Authenticated users can view prescriptions"
ON public.prescriptions FOR SELECT TO authenticated
USING (true);

-- Fix prescriptions update policy - ensure permissive
DROP POLICY IF EXISTS "Doctors can update prescriptions" ON public.prescriptions;
CREATE POLICY "Doctors can update prescriptions"
ON public.prescriptions FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'doctor'::app_role)
);
