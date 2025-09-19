# Task Completion Workflow

## Required Steps When Task is Completed

### 1. Code Quality Checks

**ALWAYS run before committing:**

```bash
bun check:fix
```

This command runs Biome linting with auto-fix and must pass before any commit.

### 2. Type Checking

```bash
bun tc
```

Ensure all TypeScript types are correct.

### 3. Testing (when applicable)

```bash
bun run test
```

Run the test suite to ensure no regressions.

### 4. Git Workflow

- **Commit Messages**: Must use prefixes: `chore`, `fix`, `feat`, `docs`
- **Language**: Write commit messages in Japanese
- **Format**: `type: description of what was changed and why`
- **Frequency**: Make commits frequently with small granularity
- **Branch Naming**: Use prefixes like `feat/`, `fix/`, `docs/`, `chore/` with issue numbers

### 5. CI/CD Considerations

- Lint, test, and typecheck are verified in CI
- Confirm local success before pushing
- PRs will NOT be merged if there are CI errors
- No manual deployment needed (Vercel handles this)

### 6. Git Hooks

- Currently commented out in `lefthook.yml`
- When enabled, will run `check:fix`, `tc`, and `test` on pre-commit
- Will also run checks on pre-push

## Example Workflow

```bash
# After making changes
bun check:fix
bun tc
bun run test  # if tests exist
git add .
git commit -m "feat: 新機能を追加し、UIを改善"
git push
```
