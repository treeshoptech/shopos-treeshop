# ShopOS Database Schema

TreeShop LLC operational database powered by Supabase PostgreSQL.

## Quick Start

### Run Migration in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/ppxowjcubovwlwarzlmx
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste and run the SQL
5. Verify tables in **Table Editor**

## Schema Overview

### 7 Core Tables

| Table | Purpose | Key Features |
|-------|---------|-------------|
| **profiles** | User profiles (extends auth.users) | Auto-created on signup, role-based (admin/crew/customer) |
| **leads** | Quote requests & submissions | Service type, qualification data, geo-location |
| **jobs** | Booked work & scheduling | TreeShop pricing methodology, crew assignment |
| **invoices** | Billing documents | Line items as JSONB, status tracking |
| **payments** | Payment transactions | Stripe integration, multiple methods |
| **equipment** | Asset tracking & costing | Army Corps depreciation methodology |
| **founding_member_applications** | B2B coaching leads | Qualification workflow for $2,500/mo program |

## Table Details

### `profiles`
Extends Supabase auth.users with business-specific fields.

**Roles:**
- `admin` - Full access to all operations
- `crew` - Field workers, view assigned jobs
- `customer` - End customers, view own jobs/invoices

**Auto-creation:** Trigger creates profile record when user signs up.

---

### `leads`
Inbound lead capture from:
- Website quote forms
- Calculator tool submissions
- Ad campaigns (Meta, Google)
- Referrals

**Service Types:**
- `forestry_mulching`
- `land_clearing`
- `stump_grinding`
- `drainage`
- `other`

**Status Flow:**
```
new → contacted → quoted → scheduled → completed
                                    ↓
                                   lost
```

**Qualification Fields:**
- `vegetation_density` - Light/Medium/Heavy/Very Heavy
- `dbh_package` - Tree diameter packages (4"/6"/8"/10")
- `estimated_value` - Auto-calculated from tools

---

### `jobs`
Confirmed work orders.

**Pricing Methodology (TreeShop):**
- Base price from `dbh_package` + `acreage`
- `work_volume_score` - Density-based multiplier
- `project_factors` - JSONB adjustments (terrain, access, debris, etc.)

**Status Flow:**
```
pending → scheduled → in_progress → completed
                                  ↓
                              cancelled
```

**Relations:**
- `lead_id` - Source lead (optional)
- `customer_id` - Billing customer
- `assigned_to` - Crew member

---

### `invoices`
Generated from completed jobs.

**Line Items:** Stored as JSONB array:
```json
[
  {
    "description": "Forestry Mulching - 5 acres",
    "quantity": 5,
    "unit_price": 1200.00,
    "total": 6000.00
  }
]
```

**Status Flow:**
```
draft → sent → paid
            ↓
         overdue
```

---

### `payments`
Payment records linked to invoices/jobs.

**Methods:**
- `cash`, `check`, `card`, `ach`, `stripe`, `other`

**Stripe Integration:**
- `stripe_payment_id` - Payment Intent ID
- `stripe_checkout_session_id` - Checkout session

---

### `equipment`
Asset tracking using Army Corps cost methodology.

**Hourly Rates:**
- `hourly_depreciation` = (purchase_price - salvage_value) / useful_life_hours
- `hourly_maintenance` - Estimated repair costs
- `hourly_fuel` - Fuel consumption rate
- `hourly_rate` - Total $/hr (sum of above)

**Types:**
- `skid_steer`, `mulcher_attachment`, `stump_grinder`, `truck`, `trailer`, `other`

---

### `founding_member_applications`
TreeShop Pro B2B coaching program leads.

**Qualification:**
- Budget confirmation: $2,500/mo commitment
- Business info: Revenue, team size, years in business
- Services offered (array)

**Status Flow:**
```
new → reviewing → qualified → scheduled → enrolled
                                        ↓
                                    rejected
```

## Security (RLS Policies)

All tables have Row Level Security enabled.

### Profiles
- ✅ Users view/update own profile
- ✅ Admins view all profiles

### Leads
- ✅ Anyone can create (anonymous form submissions)
- ✅ Staff (admin/crew) can manage

### Jobs
- ✅ Admins - full access
- ✅ Crew - view assigned jobs
- ✅ Customers - view own jobs

### Invoices & Payments
- ✅ Admins - full access
- ✅ Customers - view own records

### Equipment
- ✅ Admins only

### Founding Member Applications
- ✅ Anyone can submit
- ✅ Admins manage

## Indexes

Performance indexes on commonly queried fields:
- Lead status, created_at, service_type
- Job status, scheduled_date, customer_id, assigned_to
- Invoice status, customer_id
- Payment invoice_id, customer_id

## Next Steps

After running the migration:

1. **Create Admin User:**
   - Sign up via Supabase Auth
   - Manually update `profiles.role = 'admin'` in Table Editor

2. **Test Policies:**
   - Create test lead (anonymous)
   - Create test job as admin
   - Verify customer can only see own jobs

3. **Seed Data (Optional):**
   - Add sample equipment records
   - Create test leads/jobs for development

## TypeScript Types

Generate types from schema:
```bash
npx supabase gen types typescript --project-id ppxowjcubovwlwarzlmx > src/types/database.types.ts
```

## Backup & Migration

- **Version:** 001_initial_schema.sql
- **Date:** 2025-12-27
- **Status:** Initial deployment
