# Contributing to Namecheap E-commerce Store

Thank you for your interest in contributing to Namecheap! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check existing feature requests
2. Create an issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

5. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add bulk product export feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Component Structure

```tsx
// 1. Imports
import { useState } from 'react';
import { ComponentName } from './components';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export default function MyComponent({ props }: Props) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Functions
  const handleAction = () => {
    // ...
  };

  // 6. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### Commit Message Format

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple screen sizes
- Test edge cases

## Project Structure

```
├── backend/          # Express.js backend
│   ├── config/      # Database and config
│   ├── middleware/  # Auth and other middleware
│   ├── routes/      # API routes
│   └── schema.sql   # Database schema
├── src/
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   └── types/       # TypeScript types
└── public/          # Static assets
```

## Getting Help

- Check existing documentation
- Search closed issues
- Ask in discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

Thank you for contributing to Namecheap! 🎉
