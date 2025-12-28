# Contributing to E-Commerce Store

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/vercel-ecommerce-store.git
   cd vercel-ecommerce-store
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Initialize Database**
   ```bash
   chmod +x database/init.sh
   ./database/init.sh
   ```

5. **Run Development Server**
   ```bash
   npm run dev:all
   ```

## Project Structure

- `api/` - Backend microservices
  - `gateway/` - API Gateway (main entry point)
  - `auth/` - Authentication & user management
  - `product/` - Product management
  - `cart/` - Shopping cart
  - `order/` - Order processing
  - `payment/` - Payment handling
  - `discount/` - Discount codes
  - `admin/` - Admin operations
  - `notification/` - Notifications

- `client/` - React frontend
  - `src/components/` - Reusable components
  - `src/pages/` - Page components
  - `src/services/` - API service layer
  - `src/types/` - TypeScript type definitions
  - `src/utils/` - Utility functions
  - `src/styles/` - CSS styles

- `database/` - Database files
  - `schema.sql` - Database schema
  - `seed.sql` - Sample data
  - `db.js` - Database connection

## Coding Standards

### Backend (JavaScript)

- Use ES6+ features
- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Proper error handling with try-catch
- Validate user input
- Use meaningful variable and function names

Example:
```javascript
async createProduct(productData) {
  try {
    const { name, price } = productData;
    
    if (!name || !price) {
      throw new Error('Missing required fields');
    }
    
    const result = await db.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
```

### Frontend (TypeScript/React)

- Use TypeScript for type safety
- Functional components with hooks
- Proper component composition
- CSS modules or scoped styles
- Handle loading and error states
- Responsive design

Example:
```typescript
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await api.addToCart(product.id, 1);
      alert('Added to cart!');
    } catch (error) {
      console.error(error);
      alert('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};
```

## Git Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, tested code
   - Follow existing code style
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add feature: description of your changes"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of changes

## Commit Message Guidelines

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add product search functionality
fix: resolve cart total calculation issue
docs: update API documentation for orders
refactor: improve error handling in auth service
```

## Testing Guidelines

### Backend Testing
- Test all API endpoints
- Verify authentication and authorization
- Test error cases
- Check database constraints

### Frontend Testing
- Test user interactions
- Verify form validation
- Test error states
- Check responsive design

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No console.log statements (unless intentional)
- [ ] No commented-out code
- [ ] Responsive design works on mobile
- [ ] No security vulnerabilities introduced

## Feature Requests

To request a feature:

1. Check if it already exists in issues
2. Create a new issue with:
   - Clear description
   - Use case
   - Expected behavior
   - Any relevant mockups or examples

## Bug Reports

When reporting bugs:

1. Check if the bug is already reported
2. Create an issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, etc.)

## Code Review Process

1. PRs require review from maintainers
2. Address review comments
3. Maintain discussion in PR comments
4. Once approved, PR will be merged

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions in existing issues
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

Thank you for contributing! 🎉
