# Database Verification Checklist

After running `001_initial_schema.sql` in Supabase SQL Editor, verify the following:

## ✅ Tables Created (7)

Navigate to **Table Editor** in Supabase Dashboard and confirm:

1. ✅ `profiles`
2. ✅ `leads`
3. ✅ `jobs`
4. ✅ `invoices`
5. ✅ `payments`
6. ✅ `equipment`
7. ✅ `founding_member_applications`

## ✅ RLS Enabled

For each table, check that Row Level Security is ON:
- Go to **Authentication** → **Policies**
- Each table should show as "RLS Enabled"

## ✅ Policies Created

Verify policies exist:

### Profiles (3 policies)
- ✅ "Users can view own profile"
- ✅ "Users can update own profile"
- ✅ "Admins can view all profiles"

### Leads (2 policies)
- ✅ "Staff can manage leads"
- ✅ "Anyone can create leads"

### Jobs (3 policies)
- ✅ "Admins full access to jobs"
- ✅ "Crew can view assigned jobs"
- ✅ "Customers can view own jobs"

### Invoices (2 policies)
- ✅ "Admins manage invoices"
- ✅ "Customers view own invoices"

### Payments (2 policies)
- ✅ "Admins manage payments"
- ✅ "Customers view own payments"

### Equipment (1 policy)
- ✅ "Admins manage equipment"

### Founding Member Applications (2 policies)
- ✅ "Anyone can submit application"
- ✅ "Admins manage applications"

**Total:** 15 policies

## ✅ Indexes Created

Check in **Database** → **Indexes**:

### Leads (3 indexes)
- ✅ `idx_leads_status`
- ✅ `idx_leads_created_at`
- ✅ `idx_leads_service_type`

### Jobs (4 indexes)
- ✅ `idx_jobs_status`
- ✅ `idx_jobs_scheduled_date`
- ✅ `idx_jobs_customer_id`
- ✅ `idx_jobs_assigned_to`

### Invoices (2 indexes)
- ✅ `idx_invoices_status`
- ✅ `idx_invoices_customer_id`

### Payments (2 indexes)
- ✅ `idx_payments_invoice_id`
- ✅ `idx_payments_customer_id`

**Total:** 11 indexes

## ✅ Trigger & Function

Navigate to **Database** → **Functions**:

1. ✅ Function: `handle_new_user()` exists
2. ✅ Trigger: `on_auth_user_created` on `auth.users` table

### Test Auto-Profile Creation

1. Sign up a test user via Supabase Auth
2. Check `public.profiles` table
3. Verify profile was auto-created with:
   - Same `id` as auth.users
   - Email populated
   - Default role = 'customer'

## Common Issues

### Issue: "permission denied for schema public"
**Fix:** Run as database owner or ensure you're logged into correct project

### Issue: Policies not working
**Fix:**
1. Verify RLS is enabled: `ALTER TABLE tablename ENABLE ROW LEVEL SECURITY;`
2. Check auth.uid() returns valid UUID

### Issue: Trigger not firing
**Fix:**
1. Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'handle_new_user'`
2. Check trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created'`

## Next: Create Admin User

1. Sign up via your app (or Supabase Auth UI)
2. Go to **Table Editor** → `profiles`
3. Find your profile record
4. Update `role` column to `'admin'`
5. Save

Now you can test admin-only features!

## Generate TypeScript Types

Once verified, generate types:

```bash
npx supabase gen types typescript --project-id ppxowjcubovwlwarzlmx > src/types/database.types.ts
```

This creates type-safe database interfaces for your Next.js app.
