# Deployment Guide - Vercel

This guide walks you through deploying the e-commerce platform to Vercel.

## Prerequisites

- Vercel account (free tier works)
- PostgreSQL database (recommended: Neon, Supabase, or Railway)
- GitHub repository with your code

## Step 1: Setup PostgreSQL Database

### Option A: Neon (Recommended)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host/database`)

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

### Option C: Railway

1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 2: Initialize Database Schema

Run the schema on your database:

```bash
# Using psql
psql "your-connection-string" -f database/schema.sql

# Or using database GUI (pgAdmin, TablePlus, etc.)
# Copy and execute the contents of database/schema.sql
```

Optionally seed sample data:

```bash
psql "your-connection-string" -f database/seed.sql
```

## Step 3: Push Code to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 4: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: `npm install`
   - Output Directory: Leave empty
5. Click "Deploy"

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

## Step 5: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection string | Production, Preview, Development |
| `JWT_SECRET` | A strong random string (generate one!) | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### Generate JWT Secret

```bash
# Option 1: Using Node
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64
```

## Step 6: Redeploy

After adding environment variables:

1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"

Or trigger a new deployment:

```bash
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

## Step 7: Verify Deployment

Visit your Vercel URL (e.g., `your-app.vercel.app`) and test:

1. **Backend API**: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend**: `https://your-app.vercel.app`
   - Should load the home page

## Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Troubleshooting

### API Routes Not Working

Check `vercel.json` configuration:

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/gateway/index.js"
    }
  ]
}
```

### Database Connection Issues

1. Verify `DATABASE_URL` is set correctly
2. Check database allows connections from Vercel IPs
3. Ensure SSL is configured properly

### Build Failures

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### Frontend Not Loading

1. Check that React build completed successfully
2. Verify `client/build` directory exists
3. Check browser console for errors

## Production Checklist

Before going live:

- [ ] Database schema is created
- [ ] Environment variables are set
- [ ] JWT_SECRET is strong and secret
- [ ] Create admin user
- [ ] Test all major features
- [ ] Add sample products
- [ ] Configure custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up error monitoring (optional)

## Monitoring and Maintenance

### View Logs

```bash
vercel logs your-deployment-url
```

### Check Deployment Status

```bash
vercel ls
```

### Rollback to Previous Deployment

1. Go to Deployments tab
2. Click on a previous deployment
3. Click "Promote to Production"

## Performance Optimization

1. **Enable Caching**
   - Add caching headers for static assets
   - Configure API response caching

2. **Database Optimization**
   - Use connection pooling
   - Add indexes for frequently queried columns
   - Monitor slow queries

3. **Frontend Optimization**
   - Enable production build optimizations
   - Use lazy loading for components
   - Optimize images

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong JWT secret
   - Rotate secrets periodically

2. **Database**
   - Use SSL connections
   - Limit database user permissions
   - Regular backups

3. **API**
   - Enable rate limiting
   - Validate all inputs
   - Use HTTPS only

## Scaling Considerations

Vercel automatically scales, but consider:

1. **Database**
   - Upgrade to a plan with more connections
   - Use read replicas for heavy read operations
   - Consider database optimization

2. **API Gateway**
   - Implement caching where appropriate
   - Use CDN for static assets
   - Monitor response times

## Cost Optimization

Vercel Free Tier Limits:
- Bandwidth: 100GB/month
- Serverless Function Execution: 100GB-Hrs
- Build Minutes: 6000 minutes/month

To optimize:
- Cache aggressively
- Optimize images
- Use serverless functions efficiently
- Monitor usage in dashboard

## Support

For issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: support@vercel.com
- Project Issues: GitHub Issues

## Next Steps

After successful deployment:

1. Test all features thoroughly
2. Add products via admin panel
3. Create promotional discount codes
4. Share your store URL
5. Monitor analytics and logs

Happy deploying! 🚀
