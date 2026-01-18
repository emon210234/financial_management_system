# Git & GitHub Quick Reference Guide

## 🚀 Daily Workflow Commands

### Starting Your Work Day

```bash
# 1. Check your current location
git branch
git status

# 2. Update main branch
git checkout main
git pull origin main

# 3. Create or switch to feature branch
git checkout -b feature/your-feature-name
# OR switch to existing branch:
git checkout feature/your-feature-name
```

### During Work

```bash
# Check what you've changed
git status
git diff

# Stage your changes
git add .
# OR stage specific files:
git add path/to/file.js

# Commit your changes
git commit -m "Your descriptive message"
```

### Ending Your Work Day

```bash
# Push your branch to GitHub
git push origin feature/your-feature-name

# First time pushing a branch? Use:
git push --set-upstream origin feature/your-feature-name
```

---

## 🌳 Branch Commands

| Command | What It Does |
|---------|--------------|
| `git branch` | List all local branches |
| `git branch -a` | List all branches (local + remote) |
| `git branch feature/name` | Create new branch (don't switch) |
| `git checkout feature/name` | Switch to existing branch |
| `git checkout -b feature/name` | Create AND switch to new branch |
| `git branch -d feature/name` | Delete local branch (safe) |
| `git branch -D feature/name` | Delete local branch (force) |
| `git push origin --delete feature/name` | Delete remote branch |

---

## 🔄 Syncing Commands

| Command | What It Does |
|---------|--------------|
| `git fetch origin` | Download changes (don't apply) |
| `git pull origin main` | Download and merge changes |
| `git pull origin feature/name` | Pull specific branch |
| `git push origin feature/name` | Upload your branch |
| `git remote -v` | Show remote repository URL |

---

## 👀 Viewing History & Changes

| Command | What It Does |
|---------|--------------|
| `git status` | See modified files |
| `git diff` | See unstaged changes |
| `git diff --staged` | See staged changes |
| `git log` | View commit history |
| `git log --oneline` | Compact history view |
| `git log --graph --oneline --all` | Visual branch history |
| `git show commit-hash` | Show specific commit details |

---

## 🔙 Undo Commands

### Undo Unstaged Changes (Before `git add`)

```bash
# Discard changes to a specific file
git checkout -- path/to/file.js

# Discard ALL unstaged changes (⚠️ destructive!)
git checkout -- .
```

### Undo Staged Changes (After `git add`, before `git commit`)

```bash
# Unstage a specific file (keep changes)
git reset HEAD path/to/file.js

# Unstage all files (keep changes)
git reset HEAD
```

### Undo Committed Changes (After `git commit`)

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last commit, discard all changes (⚠️ destructive!)
git reset --hard HEAD~1

# If you already pushed, use revert instead:
git revert HEAD
git push origin branch-name
```

---

## 💾 Stash Commands (Temporary Save)

```bash
# Save current changes temporarily
git stash

# Save with a descriptive message
git stash save "Work in progress on login feature"

# List all stashes
git stash list

# Apply most recent stash and keep it
git stash apply

# Apply most recent stash and remove it
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete most recent stash
git stash drop

# Delete all stashes
git stash clear
```

---

## 🔧 Conflict Resolution

### When You See a Conflict

```bash
# 1. Check which files have conflicts
git status

# 2. Open conflicted files - they'll look like:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 3. Edit the file to resolve (remove markers and choose/merge code)

# 4. Mark as resolved
git add conflicted-file.js

# 5. Complete the merge
git commit -m "Resolve merge conflict in conflicted-file.js"

# 6. Push if needed
git push origin your-branch-name
```

---

## 🚨 Emergency Commands

### "I'm on the wrong branch!"

```bash
# If you haven't committed yet:
git stash
git checkout correct-branch
git stash pop

# If you already committed:
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset --hard HEAD~1
```

### "I forgot to pull before making changes!"

```bash
git stash
git pull origin main
git stash pop
# Resolve any conflicts that appear
```

### "I committed to main by accident!"

```bash
# Create branch with your changes
git branch feature/my-work

# Reset main to match remote
git checkout main
git reset --hard origin/main

# Continue on your feature branch
git checkout feature/my-work
git push origin feature/my-work
```

### "I need to update my branch with latest main"

```bash
# Option 1: Merge (creates merge commit)
git checkout your-branch
git merge main

# Option 2: Rebase (cleaner history - advanced)
git checkout your-branch
git rebase main
```

---

## 📝 Commit Message Best Practices

### Good Examples ✅

```
Add user authentication form
Fix login button alignment issue
Update API endpoint for user registration
Remove deprecated password validation
Refactor database connection logic
```

### Bad Examples ❌

```
Update
Fixed stuff
Changes
asdfgh
WIP
```

### Commit Message Template

```
<type>: <short description>

Type options:
- Add: New feature or functionality
- Fix: Bug fix
- Update: Modify existing feature
- Remove: Delete code or feature
- Refactor: Code restructuring
- Docs: Documentation changes
```

---

## 🎯 Common Workflows

### Feature Development Workflow

```bash
# 1. Start from updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Do your work, commit regularly
git add .
git commit -m "Add new feature component"

# 4. Push to GitHub
git push origin feature/new-feature

# 5. Create Pull Request on GitHub

# 6. After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### Bug Fix Workflow

```bash
# 1. Create bug fix branch
git checkout main
git pull origin main
git checkout -b bugfix/fix-issue-name

# 2. Fix the bug
git add fixed-file.js
git commit -m "Fix issue with login validation"

# 3. Push and create PR
git push origin bugfix/fix-issue-name

# 4. After merge, cleanup
git checkout main
git pull origin main
git branch -d bugfix/fix-issue-name
```

### Getting Teammate's Changes

```bash
# Fetch all branches
git fetch origin

# See all branches
git branch -a

# Switch to their branch
git checkout feature/their-feature

# Or merge their changes into yours
git checkout your-branch
git merge feature/their-feature
```

---

## 🔍 Troubleshooting

### "fatal: not a git repository"

**Problem**: You're not in a Git repository
**Solution**: Navigate to your project folder or run `git init`

### "error: failed to push"

**Problem**: Remote has changes you don't have
**Solution**: `git pull origin branch-name` then push again

### "Your branch is ahead of 'origin/main' by X commits"

**Problem**: You have local commits not pushed
**Solution**: `git push origin your-branch-name`

### "Your branch is behind 'origin/main' by X commits"

**Problem**: Remote has changes you don't have
**Solution**: `git pull origin main`

### "Please commit your changes or stash them"

**Problem**: You have uncommitted changes and trying to switch branches
**Solution**: Either commit them or `git stash` them

---

## 🎓 Learning Path

### Week 1: Basics
- ✅ Clone repository
- ✅ Create branches
- ✅ Commit changes
- ✅ Push branches
- ✅ Create Pull Requests

### Week 2: Collaboration
- ✅ Pull teammate's changes
- ✅ Review Pull Requests
- ✅ Merge branches
- ✅ Handle simple conflicts

### Week 3: Advanced
- ✅ Use git stash
- ✅ Resolve complex conflicts
- ✅ Use git rebase
- ✅ Cherry-pick commits

---

## 📋 Pre-Commit Checklist

Before every commit, check:

- [ ] Code runs without errors
- [ ] You're on the correct branch
- [ ] You reviewed your changes (`git diff`)
- [ ] You have a clear commit message ready
- [ ] You're not committing sensitive data (passwords, keys)
- [ ] You're not committing unnecessary files (node_modules, .env)

---

## 🔗 Pull Request Checklist

Before creating a PR:

- [ ] Branch is up to date with main
- [ ] Code has been tested
- [ ] Commit messages are clear
- [ ] No merge conflicts
- [ ] PR description explains changes
- [ ] Screenshots included (for UI changes)

---

## 🎨 Branch Naming Convention

```
feature/    → New features
bugfix/     → Bug fixes
hotfix/     → Urgent production fixes
enhancement/→ Improvements to existing features
refactor/   → Code refactoring
docs/       → Documentation updates
test/       → Test additions or changes

Examples:
feature/user-authentication
bugfix/login-validation-error
enhancement/improve-dashboard-ui
docs/update-readme
```

---

## 💡 Pro Tips

1. **Commit Often**: Small commits are easier to understand and revert
2. **Pull Before Push**: Always pull latest changes before pushing
3. **Descriptive Messages**: Future you will thank present you
4. **Test Before Commit**: Don't commit broken code
5. **One Branch, One Purpose**: Keep branches focused
6. **Delete Merged Branches**: Keep your branch list clean
7. **Use `.gitignore`**: Don't commit build files or dependencies
8. **Communicate**: Tell your teammate what you're working on

---

## 🔗 Useful Git Aliases

Add these to your `~/.gitconfig` file:

```bash
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD
    last = log -1 HEAD
    visual = log --graph --oneline --all
    undo = reset --soft HEAD~1
```

Use them like: `git st` instead of `git status`

---

## 📱 GitHub Desktop Alternative

If command line is intimidating at first:
- Download GitHub Desktop: https://desktop.github.com/
- Visual interface for Git operations
- Good for learning, but learn CLI eventually

---

## 🆘 When Things Go Wrong

**Golden Rules**:
1. Don't panic
2. Don't use `--force` unless you know what you're doing
3. Before trying to fix, make a backup: `git branch backup-branch`
4. Ask for help - Git can usually recover anything

---

**Remember**: Git is a tool to help you collaborate safely. When in doubt, ask your teammate or create a backup branch before trying something risky!

Happy collaborating! 🎉
