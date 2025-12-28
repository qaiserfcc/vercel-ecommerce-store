#!/bin/bash

# Verification script to check project setup

set -e

echo "🔍 Verifying E-Commerce Platform Setup..."
echo ""

# Check Node.js
echo "✅ Checking Node.js..."
node --version || { echo "❌ Node.js not found"; exit 1; }

# Check npm
echo "✅ Checking npm..."
npm --version || { echo "❌ npm not found"; exit 1; }

# Check PostgreSQL (optional)
echo "✅ Checking PostgreSQL..."
psql --version 2>/dev/null && echo "PostgreSQL found" || echo "⚠️  PostgreSQL not found (optional for local development)"

echo ""
echo "📁 Verifying project structure..."

# Check backend files
echo "✅ Checking backend services..."
for service in gateway auth product cart order payment discount admin notification; do
    if [ -d "api/$service" ]; then
        echo "  ✓ $service service"
    else
        echo "  ✗ $service service missing"
        exit 1
    fi
done

# Check frontend files
echo "✅ Checking frontend..."
[ -d "client/src" ] && echo "  ✓ Frontend source" || { echo "  ✗ Frontend source missing"; exit 1; }
[ -f "client/package.json" ] && echo "  ✓ Frontend package.json" || { echo "  ✗ Frontend package.json missing"; exit 1; }

# Check database files
echo "✅ Checking database files..."
[ -f "database/schema.sql" ] && echo "  ✓ Database schema" || { echo "  ✗ Database schema missing"; exit 1; }
[ -f "database/seed.sql" ] && echo "  ✓ Seed data" || { echo "  ✗ Seed data missing"; exit 1; }
[ -f "database/db.js" ] && echo "  ✓ Database connection" || { echo "  ✗ Database connection missing"; exit 1; }

# Check configuration files
echo "✅ Checking configuration files..."
[ -f "package.json" ] && echo "  ✓ Root package.json" || { echo "  ✗ Root package.json missing"; exit 1; }
[ -f "vercel.json" ] && echo "  ✓ Vercel config" || { echo "  ✗ Vercel config missing"; exit 1; }
[ -f ".env.example" ] && echo "  ✓ Environment example" || { echo "  ✗ Environment example missing"; exit 1; }

# Check documentation
echo "✅ Checking documentation..."
[ -f "README.md" ] && echo "  ✓ README" || { echo "  ✗ README missing"; exit 1; }
[ -f "API_DOCUMENTATION.md" ] && echo "  ✓ API Documentation" || { echo "  ✗ API Documentation missing"; exit 1; }
[ -f "DEPLOYMENT.md" ] && echo "  ✓ Deployment Guide" || { echo "  ✗ Deployment Guide missing"; exit 1; }

# Check syntax of critical JavaScript files
echo "✅ Checking JavaScript syntax..."
node -c api/gateway/index.js && echo "  ✓ API Gateway" || { echo "  ✗ API Gateway syntax error"; exit 1; }
node -c database/db.js && echo "  ✓ Database config" || { echo "  ✗ Database config syntax error"; exit 1; }

echo ""
echo "✅ All checks passed!"
echo ""
echo "📝 Next steps:"
echo "  1. Copy .env.example to .env and configure it"
echo "  2. Run: npm install"
echo "  3. Run: cd client && npm install && cd .."
echo "  4. Setup PostgreSQL database"
echo "  5. Run: ./database/init.sh"
echo "  6. Run: npm run dev:all"
echo ""
echo "📖 See README.md for detailed setup instructions"
