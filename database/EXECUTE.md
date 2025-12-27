# Execute Database Migration

## Quick Method (Recommended)

### Step 1: Open Supabase SQL Editor

Click this link:
**https://supabase.com/dashboard/project/ppxowjcubovwlwarzlmx/sql/new**

Or navigate manually:
1. Go to https://supabase.com/dashboard
2. Select project `ppxowjcubovwlwarzlmx`
3. Click **SQL Editor** in left sidebar
4. Click **New query**

### Step 2: Execute Migration

1. Open `database/migrations/001_initial_schema.sql` in your code editor
2. **Copy all** (Cmd+A, Cmd+C)
3. **Paste** into Supabase SQL Editor
4. Click **Run** (or Cmd+Enter)

### Step 3: Verify

You should see:
```
Success. No rows returned
```

Then check **Table Editor** - you should see 7 new tables:
- profiles
- leads
- jobs
- invoices
- payments
- equipment
- founding_member_applications

### Step 4: Create Admin User

1. Sign up via your app or Supabase Auth UI
2. Go to **Table Editor** → `profiles`
3. Find your profile row
4. Click the `role` cell
5. Change from `customer` to `admin`
6. Save

---

## Alternative Method: Using Supabase CLI

If you have Supabase CLI installed and linked:

```bash
# Link your project (one-time setup)
supabase link --project-ref ppxowjcubovwlwarzlmx

# Push migration
supabase db push --file database/migrations/001_initial_schema.sql
```

---

## Troubleshooting

### "relation already exists"
Tables are already created. Check Table Editor to see existing tables.

### "permission denied for schema public"
You're not authenticated as the database owner. Use the SQL Editor in Supabase Dashboard instead.

### "function handle_new_user already exists"
The trigger function is already installed. Safe to ignore or drop and recreate:
```sql
DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;
```
Then re-run the migration.

---

## After Migration

✅ **Verify tables** exist in Table Editor
✅ **Check RLS** is enabled (Authentication → Policies)
✅ **Create admin user** as described above
✅ **Generate TypeScript types**:
```bash
npm run db:types
```
