-- =============================================
-- ShopOS Initial Database Schema
-- TreeShop LLC - First Deployment
-- =============================================
-- This schema supports:
-- - Lead management and qualification
-- - Job scheduling and tracking
-- - Invoicing and payments
-- - Equipment cost tracking
-- - Founding member applications (B2B)
-- =============================================

-- =============================================
-- PROFILES (extends auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'crew', 'customer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- LEADS (quote requests, tool submissions)
-- =============================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact info
  name TEXT,
  email TEXT,
  phone TEXT,

  -- Property info
  property_address TEXT,
  city TEXT,
  zip TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  acreage DECIMAL(10, 2),

  -- Lead details
  service_type TEXT CHECK (service_type IN ('forestry_mulching', 'land_clearing', 'stump_grinding', 'drainage', 'other')),
  source TEXT, -- 'website', 'meta_ads', 'google_ads', 'referral', 'tool_calculator', etc.
  source_detail TEXT, -- specific tool or campaign

  -- Qualification
  vegetation_density TEXT CHECK (vegetation_density IN ('light', 'medium', 'heavy', 'very_heavy')),
  dbh_package TEXT CHECK (dbh_package IN ('4_inch', '6_inch', '8_inch', '10_inch')),
  estimated_value DECIMAL(10, 2),

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'lost')),
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  contacted_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- =============================================
-- JOBS (booked work)
-- =============================================
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  lead_id UUID REFERENCES public.leads(id),
  customer_id UUID REFERENCES public.profiles(id),
  assigned_to UUID REFERENCES public.profiles(id),

  -- Job info
  service_type TEXT NOT NULL CHECK (service_type IN ('forestry_mulching', 'land_clearing', 'stump_grinding', 'drainage', 'other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),

  -- Location
  address TEXT NOT NULL,
  city TEXT,
  zip TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),

  -- Scheduling
  scheduled_date DATE,
  scheduled_time TIME,
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),

  -- Pricing (using TreeShop methodology)
  dbh_package TEXT CHECK (dbh_package IN ('4_inch', '6_inch', '8_inch', '10_inch')),
  acreage DECIMAL(10, 2),
  work_volume_score DECIMAL(5, 2),
  project_factors JSONB DEFAULT '{}', -- stores all factor adjustments
  estimated_price DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  deposit_amount DECIMAL(10, 2),
  deposit_paid BOOLEAN DEFAULT false,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- =============================================
-- INVOICES
-- =============================================
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  job_id UUID REFERENCES public.jobs(id),
  customer_id UUID REFERENCES public.profiles(id),

  -- Invoice details
  invoice_number TEXT UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),

  -- Amounts
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_rate DECIMAL(5, 4) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  balance_due DECIMAL(10, 2),

  -- Line items stored as JSON
  line_items JSONB DEFAULT '[]',

  -- Dates
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  paid_date DATE,

  -- Notes
  notes TEXT,
  terms TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- PAYMENTS
-- =============================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  invoice_id UUID REFERENCES public.invoices(id),
  job_id UUID REFERENCES public.jobs(id),
  customer_id UUID REFERENCES public.profiles(id),

  -- Payment details
  amount DECIMAL(10, 2) NOT NULL,
  method TEXT CHECK (method IN ('cash', 'check', 'card', 'ach', 'stripe', 'other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),

  -- External refs
  stripe_payment_id TEXT,
  stripe_checkout_session_id TEXT,

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- =============================================
-- EQUIPMENT (for cost tracking)
-- =============================================
CREATE TABLE public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Equipment info
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('skid_steer', 'mulcher_attachment', 'stump_grinder', 'truck', 'trailer', 'other')),
  make TEXT,
  model TEXT,
  year INTEGER,

  -- Financials (Army Corps methodology)
  purchase_price DECIMAL(12, 2),
  current_value DECIMAL(12, 2),
  salvage_value DECIMAL(12, 2),
  useful_life_hours INTEGER,
  hours_used DECIMAL(10, 2) DEFAULT 0,

  -- Calculated rates
  hourly_depreciation DECIMAL(8, 2),
  hourly_maintenance DECIMAL(8, 2),
  hourly_fuel DECIMAL(8, 2),
  hourly_rate DECIMAL(8, 2), -- total $/hr

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'retired')),
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- FOUNDING MEMBER APPLICATIONS (B2B)
-- =============================================
CREATE TABLE public.founding_member_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Business info
  business_name TEXT,
  business_location TEXT,
  years_in_business INTEGER,
  annual_revenue TEXT, -- range like '$100k-$250k'
  team_size INTEGER,

  -- Current situation
  services_offered TEXT[], -- array of services
  biggest_challenge TEXT,
  why_interested TEXT,

  -- Qualification
  budget_confirmed BOOLEAN DEFAULT false, -- confirmed $2,500/mo
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'qualified', 'scheduled', 'enrolled', 'rejected')),

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  call_scheduled_at TIMESTAMPTZ
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founding_member_applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Leads: Admins and crew can manage
CREATE POLICY "Staff can manage leads" ON public.leads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'crew'))
  );

-- Allow anonymous lead creation (for website forms)
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Jobs: Admins full access, crew can view assigned, customers can view own
CREATE POLICY "Admins full access to jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Crew can view assigned jobs" ON public.jobs
  FOR SELECT USING (
    assigned_to = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers can view own jobs" ON public.jobs
  FOR SELECT USING (customer_id = auth.uid());

-- Invoices: Admins manage, customers view own
CREATE POLICY "Admins manage invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers view own invoices" ON public.invoices
  FOR SELECT USING (customer_id = auth.uid());

-- Payments: Same as invoices
CREATE POLICY "Admins manage payments" ON public.payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customers view own payments" ON public.payments
  FOR SELECT USING (customer_id = auth.uid());

-- Equipment: Admins only
CREATE POLICY "Admins manage equipment" ON public.equipment
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Founding Member Applications: Anonymous can create, admins can manage
CREATE POLICY "Anyone can submit application" ON public.founding_member_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins manage applications" ON public.founding_member_applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_service_type ON public.leads(service_type);

CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_scheduled_date ON public.jobs(scheduled_date);
CREATE INDEX idx_jobs_customer_id ON public.jobs(customer_id);
CREATE INDEX idx_jobs_assigned_to ON public.jobs(assigned_to);

CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_customer_id ON public.invoices(customer_id);

CREATE INDEX idx_payments_invoice_id ON public.payments(invoice_id);
CREATE INDEX idx_payments_customer_id ON public.payments(customer_id);
