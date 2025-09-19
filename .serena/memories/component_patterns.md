# Component Patterns and Guidelines

## Component Structure Examples

### Typical Function Component Pattern
```typescript
// PascalCase component name
export default function ComponentName() {
  const [state, setState] = useState(false);
  
  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

### Memo-wrapped Component Pattern
```typescript
import { memo } from 'react';

const ComponentName = memo(function ComponentName() {
  // Component logic
  return <div>Content</div>;
});

export default ComponentName;
```

## Styling Patterns

### Tailwind CSS Usage
- Utility-first approach with extensive custom animations
- Complex gradient backgrounds and animations
- Responsive design with mobile-first breakpoints
- Custom animation classes like `animate-orbit`, `animate-spiral`, `animate-morphing`

### Dynamic Class Names
```typescript
className={`base-classes ${
  condition 
    ? 'conditional-classes' 
    : 'alternative-classes'
}`}
```

## State Management Patterns
- Use `useState` for component-level state
- Use `useEffect` for side effects and lifecycle events
- Custom hooks for complex logic extraction
- No external state management library currently used

## Accessibility Patterns
- Proper semantic HTML elements
- `aria-hidden` for decorative elements
- `id` attributes for form labels and headings
- Screen reader considerations

## Animation Patterns
- CSS-based animations using Tailwind
- Complex animated backgrounds with multiple elements
- Staggered animations with custom delay classes
- Performance-conscious animations with `pointer-events-none`

## Import/Export Patterns
- Default exports for components
- Named exports for utilities and types
- Absolute imports using `@/` alias
- Component barrel exports in index files