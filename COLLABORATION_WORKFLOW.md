# Collaborative Workflow & Best Practices

## 🤝 Team Workflow Agreement

This document outlines the agreed-upon workflow for collaborating on the Financial Management System project.

---

## 📋 Daily Workflow

### Morning Routine (Every Work Session Start)

```bash
# 1. Navigate to project
cd /path/to/financial_management_system

# 2. Check current status
git status
git branch

# 3. Update main branch
git checkout main
git pull origin main

# 4. Review what changed
git log --oneline -5

# 5. Create or switch to your feature branch
git checkout -b feature/your-work
# OR
git checkout feature/existing-work
git pull origin feature/existing-work
```

### During Work

```bash
# Commit frequently (every 30-60 mins)
git add .
git commit -m "Descriptive message about what you did"

# Push regularly (at least once per session)
git push origin feature/your-branch
```

### End of Day Routine

```bash
# 1. Make sure all work is committed
git status
git add .
git commit -m "End of day commit: [what you accomplished]"

# 2. Push your branch
git push origin feature/your-branch

# 3. Create or update Pull Request if feature is ready for review

# 4. Update team on progress (via Slack/Discord/etc)
```

---

## 🌳 Branching Strategy

### Branch Types

```
main
├── feature/          → New features
├── bugfix/           → Bug fixes
├── hotfix/           → Urgent production fixes
├── enhancement/      → Improvements
├── refactor/         → Code restructuring
└── docs/             → Documentation
```

### Branch Naming Rules

**Format**: `type/short-description`

**Examples**:
- ✅ `feature/user-authentication`
- ✅ `bugfix/login-validation-error`
- ✅ `enhancement/dashboard-performance`
- ✅ `refactor/api-structure`
- ✅ `docs/setup-guide`

**Avoid**:
- ❌ `my-branch`
- ❌ `test`
- ❌ `fix`
- ❌ `new-feature`

### Main Branch Rules

**The main branch is protected:**
- ✋ Never commit directly to main
- ✋ Always work on feature branches
- ✅ Merge only through Pull Requests
- ✅ Require at least 1 review before merging
- ✅ Keep main always deployable

---

## 🔄 Feature Development Workflow

### Complete Workflow Diagram

```
1. CREATE BRANCH
   main → feature/your-feature
   
2. DEVELOP
   Edit → Stage → Commit → Push
   (Repeat as needed)
   
3. CREATE PR
   feature/your-feature → main
   
4. CODE REVIEW
   Teammate reviews → Requests changes OR Approves
   
5. ADDRESS FEEDBACK (if needed)
   Make changes → Commit → Push
   
6. MERGE
   PR approved → Merge to main
   
7. CLEANUP
   Delete branch → Update local main
```

### Step-by-Step Process

#### Step 1: Start New Feature

```bash
git checkout main
git pull origin main
git checkout -b feature/new-feature
```

#### Step 2: Develop

```bash
# Make changes
# Test your changes
git add .
git commit -m "Implement X functionality"
git push origin feature/new-feature
```

#### Step 3: Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Fill out PR template:

```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Bug fix
- [x] New feature
- [ ] Enhancement
- [ ] Documentation

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Checklist
- [x] Code tested locally
- [x] No console errors
- [x] Follows coding standards
- [x] Updated documentation (if needed)

## Screenshots (if UI changes)
[Add screenshots]
```

#### Step 4: Code Review

**Reviewer's Checklist**:
- [ ] Code works as described
- [ ] No obvious bugs
- [ ] Follows project conventions
- [ ] Includes appropriate comments
- [ ] No sensitive data committed
- [ ] Changes are minimal and focused

**Leaving Review**:
```
Review → Add comments → Submit review
- Approve (if good to go)
- Request changes (if issues found)
- Comment (if just feedback)
```

#### Step 5: Address Feedback

```bash
# Make requested changes
git add .
git commit -m "Address review feedback: [what you fixed]"
git push origin feature/new-feature

# Comment on PR: "@reviewer - Feedback addressed, ready for re-review"
```

#### Step 6: Merge

```bash
# After approval, on GitHub:
1. Click "Merge pull request"
2. Confirm merge
3. Delete branch on GitHub

# Locally:
git checkout main
git pull origin main
git branch -d feature/new-feature
```

---

## ⚡ Quick Operations

### Sync with Main

When your branch gets behind main:

```bash
# Option 1: Merge (simpler)
git checkout your-branch
git merge main
git push origin your-branch

# Option 2: Rebase (cleaner, advanced)
git checkout your-branch
git rebase main
git push origin your-branch --force-with-lease
```

### Get Teammate's Latest Work

```bash
# Update all remote branches
git fetch origin

# See what's available
git branch -a

# Switch to their branch
git checkout feature/their-feature

# Or merge their changes into yours
git checkout your-branch
git merge feature/their-feature
```

### Emergency Hotfix

```bash
# Critical bug in production!
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Fix the bug
git add .
git commit -m "HOTFIX: Fix critical [bug description]"
git push origin hotfix/critical-bug

# Create PR, mark as urgent
# Fast-track review
# Merge immediately after approval
```

---

## 💬 Communication Protocol

### When to Communicate

**Before Starting Work**:
- "I'm going to work on [feature] today"
- "I'll be editing [files]"
- "My branch will be [branch-name]"

**During Work**:
- "Pushed changes to [branch]"
- "Created PR #[number] for review"
- "Found a blocker: [issue]"

**After Work**:
- "PR ready for review"
- "Merged [feature] to main"
- "Tomorrow I'll work on [next task]"

### Communication Channels

**For Different Types of Updates**:
- 💬 Quick updates: Team chat (Slack/Discord)
- 🎫 Task tracking: GitHub Issues
- 📝 Code discussion: PR comments
- 🚨 Urgent issues: Direct message + tag in chat

---

## 🎯 Work Division Strategy

### Divide by Layer

**Person A**: Frontend
- React components
- CSS/styling
- Client-side logic

**Person B**: Backend
- Express routes
- Database models
- Business logic

**Why this works**: Rarely editing same files = fewer conflicts!

### Divide by Feature

**Person A**: User Authentication
- Login/register forms
- Auth API
- Session management

**Person B**: Dashboard
- Dashboard UI
- Data visualization
- API for dashboard data

### Divide by Complexity

**Person A**: Complex features
- Payment processing
- Data analytics

**Person B**: Standard features
- CRUD operations
- UI components

---

## 🔒 Security & Safety

### Never Commit These

```bash
# Create comprehensive .gitignore
node_modules/
.env
.env.local
*.log
.DS_Store
dist/
build/
coverage/
.idea/
.vscode/
*.key
*.pem
```

### Verify Before Committing

```bash
# Always review what you're committing
git status
git diff

# Check staged changes
git diff --staged

# If you accidentally staged sensitive files:
git reset HEAD .env
```

### If You Committed Secrets

```bash
# If NOT pushed yet:
git reset --soft HEAD~1
# Remove the secret from files
git add .
git commit -m "Your commit message"

# If ALREADY pushed:
# 1. Remove the secret from files
# 2. Commit the removal
# 3. Rotate/change the secret immediately
# 4. Consider using git-filter-repo to rewrite history
```

---

## 📊 Conflict Resolution Strategy

### Avoiding Conflicts

**Best Practices**:
1. **Communicate**: Tell each other what you're working on
2. **Pull Frequently**: Get latest changes often
3. **Small Branches**: Merge within 1-3 days
4. **Clear Ownership**: One person per file when possible
5. **Modular Code**: Minimize dependencies between files

### When Conflicts Occur

**Stay Calm Process**:

1. **Understand the conflict**
   ```bash
   git status  # Which files?
   git diff    # What changed?
   ```

2. **Communicate**
   - Message your teammate
   - "Hey, we have a conflict in [file]"
   - "What were you trying to do?"

3. **Decide together**
   - Review both versions
   - Discuss the best approach
   - Agree on resolution

4. **Resolve**
   ```bash
   # Edit conflicted files
   # Remove conflict markers
   git add conflicted-file.js
   git commit -m "Resolve conflict: [explanation]"
   git push origin your-branch
   ```

5. **Test**
   - Run the application
   - Verify both features work
   - Test edge cases

---

## ✅ Pre-Commit Checklist

Before every `git commit`:

- [ ] **Code works**: Tested locally
- [ ] **No errors**: Console is clean
- [ ] **Right branch**: Check with `git branch`
- [ ] **Reviewed changes**: Used `git diff`
- [ ] **No secrets**: No .env files, API keys
- [ ] **No debug code**: No console.logs, debugger statements
- [ ] **Meaningful message**: Clear commit message ready
- [ ] **Logical unit**: Commit represents one logical change

---

## 📋 Pull Request Template

Save this as `.github/pull_request_template.md`:

```markdown
## Description
<!-- Briefly describe what this PR does -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Enhancement (improvement to existing functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
<!-- Link to the issue: Closes #123 -->

## How Has This Been Tested?
<!-- Describe how you tested your changes -->
- [ ] Tested locally
- [ ] Tested on staging
- [ ] Added unit tests
- [ ] Manual testing completed

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Additional Notes
<!-- Any other information that reviewers should know -->
```

---

## 🔍 Code Review Guidelines

### As a Reviewer

**Do**:
- ✅ Be constructive and respectful
- ✅ Explain the "why" behind suggestions
- ✅ Praise good code
- ✅ Test the changes locally if possible
- ✅ Respond within 24 hours

**Don't**:
- ❌ Be harsh or condescending
- ❌ Just say "fix this" without explanation
- ❌ Nitpick trivial things
- ❌ Approve without actually reviewing

**Good Review Comments**:
```
✅ "Great implementation! One suggestion: Consider extracting this into 
   a separate function for better reusability."

✅ "This could cause an issue if the user is null. Maybe add a check 
   like: if (!user) return null;"

✅ "Nice work on the error handling! The user experience is much better now."
```

**Bad Review Comments**:
```
❌ "This is wrong."
❌ "Why did you do it this way?"
❌ "LGTM" (without actually reviewing)
```

### As an Author

**Responding to Feedback**:
- ✅ Thank reviewer for their time
- ✅ Explain your reasoning if you disagree
- ✅ Ask questions if unclear
- ✅ Implement suggested changes promptly

---

## 🎯 Commit Message Standards

### Format

```
<type>: <short summary> (max 50 chars)

<optional detailed description>
<explain WHY, not WHAT>

<optional footer>
Closes #123
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat: Add user registration form validation"
git commit -m "fix: Resolve login timeout issue on slow networks"
git commit -m "docs: Update API documentation for auth endpoints"
git commit -m "refactor: Simplify database connection logic"

# Bad commits
git commit -m "update"
git commit -m "fixed stuff"
git commit -m "changes"
```

---

## 📈 Project Status Tracking

### Using GitHub Projects

**Board Columns**:
1. **Backlog**: Future tasks
2. **To Do**: This sprint/week
3. **In Progress**: Currently working
4. **Review**: Waiting for PR review
5. **Done**: Completed

**Update Process**:
- Move issues as they progress
- Update issue status daily
- Close issues when PR merges

### Using GitHub Issues

**Issue Template**:
```markdown
## Description
[What needs to be done?]

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## Technical Notes
[Any technical details]

## Related Issues
Depends on #123
Related to #456
```

---

## 🚀 Release Process

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH` (e.g., v1.2.3)

- **MAJOR**: Breaking changes (v1.0.0 → v2.0.0)
- **MINOR**: New features (v1.0.0 → v1.1.0)
- **PATCH**: Bug fixes (v1.0.0 → v1.0.1)

### Creating a Release

```bash
# 1. Update version in package.json
# 2. Commit version bump
git commit -am "chore: Bump version to 1.2.0"

# 3. Create tag
git tag -a v1.2.0 -m "Release version 1.2.0"

# 4. Push tag
git push origin v1.2.0

# 5. Create GitHub Release
# Go to GitHub → Releases → Draft new release
# Select tag, add release notes
```

---

## 🛠️ Troubleshooting Guide

### Common Problems & Solutions

#### "I can't push my changes"

**Problem**: `Updates were rejected`

**Solution**:
```bash
git pull origin your-branch
# Resolve any conflicts
git push origin your-branch
```

#### "I'm on the wrong branch"

**Problem**: Made changes on main or wrong branch

**Solution**:
```bash
git stash
git checkout correct-branch
git stash pop
```

#### "My branch is way behind main"

**Problem**: Branch needs many commits from main

**Solution**:
```bash
git checkout your-branch
git merge main
# Or: git rebase main
git push origin your-branch
```

#### "I committed something I shouldn't have"

**Problem**: Committed sensitive data or wrong files

**Solution**:
```bash
# If not pushed yet:
git reset --soft HEAD~1
# Remove the problematic files
git add .
git commit -m "Correct commit"

# If already pushed:
# Contact your teammate immediately
# Remove sensitive data from code
# Rotate any exposed credentials
```

---

## 📚 Learning Resources

### For You

- **GitHub Skills**: https://skills.github.com/
- **Git Book**: https://git-scm.com/book/en/v2
- **Interactive Learning**: https://learngitbranching.js.org/

### For Your Friend

- Share this entire guide
- Work through GIT_EXERCISES.md together
- Pair program on first few features

---

## 🎓 Team Agreement Signature

After reading this document, both team members should:

1. Create a branch: `agreement/your-name`
2. Add your name to the section below
3. Commit: "Sign team agreement"
4. Create PR and have teammate review
5. Merge to main

### Agreement

We agree to follow the workflows and practices outlined in this document:

**Team Members**:
- [ ] Person A - [Name]
- [ ] Person B - [Name]

**Date**: ___________

---

## 🔄 Document Updates

This is a living document. As you discover better practices:

1. Create branch: `docs/update-workflow`
2. Make changes to this document
3. Discuss with teammate
4. Create PR
5. Both review and approve
6. Merge to main

---

**Remember**: The goal is smooth collaboration, not perfect adherence to rules. Adjust these practices as needed for your team! 🤝

*Last Updated: 2026-01-18*
