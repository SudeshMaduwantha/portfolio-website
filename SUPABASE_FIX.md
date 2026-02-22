# Supabase Connection Fix for Vercel

If you encounter "Can't reach database server" or "Server error" on Vercel login, it's likely due to connection pooling issues with Serverless functions.

### Solution: Use the Transaction Pooler (Port 6543)

1. Go to your **Supabase Dashboard** -> Project Settings -> Database.
2. Under **Connection String**, change "Mode" from **Session** to **Transaction**.
   - The port should change to **6543**.
   - The host might change slightly (e.g., `aws-0-ap-southeast...pooler.supabase.com`).
3. Copy this new `DATABASE_URL`.
4. Run this helper script to generate the correct Prisma URL (with `pgbouncer=true`):

   (Or manually append `?pgbouncer=true&connection_limit=1` to the end of the URL)

### Update Vercel

1. Go to **Vercel Dashboard** -> Settings -> Environment Variables.
2. Edit `DATABASE_URL` with the new Transaction Pooler URL.
3. **Redeploy** your project (Go to Deployments -> Redeploy latest).

### Example Format

```
postgres://[user].[project]:[password]@[host]:6543/[db]?pgbouncer=true&connection_limit=1
```

Note: The `&connection_limit=1` is recommended for serverless to prevent opening too many connections.
