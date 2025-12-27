import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: path.join(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function executeSQL(sql: string) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`
    },
    body: JSON.stringify({ query: sql })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`SQL execution failed: ${error}`)
  }

  return response.json()
}

async function runMigration() {
  console.log('🚀 Starting Supabase migration...\n')

  const migrationPath = path.join(__dirname, 'migrations', '001_initial_schema.sql')

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath)
    process.exit(1)
  }

  const sql = fs.readFileSync(migrationPath, 'utf-8')

  console.log('📝 Executing schema migration...')
  console.log(`   File: ${migrationPath}`)
  console.log(`   Size: ${sql.length} characters\n`)

  try {
    // Execute via REST API
    await executeSQL(sql)

    console.log('✅ Migration completed successfully!\n')

    // Verify tables were created
    console.log('🔍 Verifying tables...')
    const tables = [
      'profiles',
      'leads',
      'jobs',
      'invoices',
      'payments',
      'equipment',
      'founding_member_applications'
    ]

    for (const table of tables) {
      const { count, error: countError } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (countError) {
        console.log(`   ❌ ${table}: ${countError.message}`)
      } else {
        console.log(`   ✅ ${table}: exists (${count || 0} records)`)
      }
    }

    console.log('\n✨ Database schema ready!\n')
    console.log('Next steps:')
    console.log('1. Create an admin user via Supabase Auth')
    console.log('2. Update their profile.role to "admin" in Table Editor')
    console.log('3. Generate TypeScript types: npm run db:types\n')

  } catch (err) {
    console.error('❌ Error:', err)

    // Fall back to manual instructions
    console.log('\n⚠️  Automatic migration failed.')
    console.log('Please run the migration manually:')
    console.log('1. Open https://supabase.com/dashboard/project/ppxowjcubovwlwarzlmx')
    console.log('2. Go to SQL Editor')
    console.log('3. Copy/paste database/migrations/001_initial_schema.sql')
    console.log('4. Click Run\n')

    process.exit(1)
  }
}

runMigration()
