# Git & GitHub Practical Exercises

## 🎯 Purpose

These hands-on exercises will help you and your friend master Git and GitHub collaboration. Complete them in order, as each builds on previous skills.

---

## 📋 Setup

Before starting:
1. Both of you should have the repository cloned
2. Both should have write access to the repository
3. Set up your Git identity (if not already done):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify setup:
```bash
git config --global user.name
git config --global user.email
```

---

## Exercise 1: Branch Creation and Navigation (15 minutes)

**Goal**: Get comfortable with creating and switching between branches.

### Person A (You)

```bash
# Step 1: Check your current status
git status
git branch

# Step 2: Make sure you're on main and it's updated
git checkout main
git pull origin main

# Step 3: Create a new branch
git checkout -b practice/person-a-learning

# Step 4: Verify you're on the new branch
git branch
# You should see an asterisk (*) next to practice/person-a-learning

# Step 5: Create a practice file
echo "Hello from Person A" > practice-a.txt

# Step 6: Stage and commit
git add practice-a.txt
git commit -m "Add practice file for Person A"

# Step 7: Push your branch
git push origin practice/person-a-learning

# Step 8: Go to GitHub and verify your branch exists
```

### Person B (Your Friend)

```bash
# Do the same steps but with your own branch name
git checkout main
git pull origin main
git checkout -b practice/person-b-learning
echo "Hello from Person B" > practice-b.txt
git add practice-b.txt
git commit -m "Add practice file for Person B"
git push origin practice/person-b-learning
```

### Verification

Both of you:
1. Go to GitHub
2. Click on the branch dropdown
3. You should see both branches listed

### Questions to Answer
- Q: What command shows you which branch you're currently on?
- Q: What's the difference between `git branch name` and `git checkout -b name`?
- Q: Can you see your friend's branch on GitHub?

---

## Exercise 2: Fetching and Checking Out Remote Branches (15 minutes)

**Goal**: Learn to access branches created by your teammate.

### Person A

```bash
# Step 1: Update your knowledge of remote branches
git fetch origin

# Step 2: List all branches (local and remote)
git branch -a
# You should see your friend's branch listed as remotes/origin/practice/person-b-learning

# Step 3: Checkout your friend's branch
git checkout practice/person-b-learning

# Step 4: Verify the file they created exists
ls
cat practice-b.txt

# Step 5: Switch back to your branch
git checkout practice/person-a-learning
```

### Person B

```bash
# Do the same to see Person A's branch
git fetch origin
git branch -a
git checkout practice/person-a-learning
cat practice-a.txt
git checkout practice/person-b-learning
```

### Questions to Answer
- Q: What's the difference between `git fetch` and `git pull`?
- Q: How do you know if a branch is local or remote?
- Q: Did you need to create the branch before checking it out?

---

## Exercise 3: Creating Your First Pull Request (20 minutes)

**Goal**: Practice the complete workflow of creating and merging a PR.

### Person A

```bash
# Step 1: Start fresh from main
git checkout main
git pull origin main

# Step 2: Create a feature branch
git checkout -b feature/add-contributor-a

# Step 3: Add yourself to README.md
# Open README.md in your editor
# Add a new section at the bottom:
## Contributors
- [Your Name] - [Your Role]

# Step 4: Commit your changes
git add README.md
git commit -m "Add Person A to contributors list"

# Step 5: Push your branch
git push origin feature/add-contributor-a

# Step 6: Create Pull Request on GitHub
# - Go to GitHub repository
# - You'll see a yellow banner: "Compare & pull request"
# - Click it
# - Title: "Add Person A to contributors"
# - Description: "Adding myself to the contributors section in README"
# - Click "Create pull request"

# Step 7: Request review from Person B
# - On the right sidebar, click "Reviewers"
# - Select your friend
```

### Person B (Reviewer)

```bash
# Step 1: Go to GitHub
# - Click "Pull requests" tab
# - Click on Person A's PR

# Step 2: Review the changes
# - Click "Files changed" tab
# - Review the modifications
# - If looks good, click "Review changes"
# - Select "Approve"
# - Add comment: "Looks good! Welcome to the contributors list!"
# - Click "Submit review"

# Step 3: Merge the PR
# - Go back to "Conversation" tab
# - Click "Merge pull request"
# - Click "Confirm merge"
# - Click "Delete branch" when offered

# Step 4: Update your local repository
git checkout main
git pull origin main

# Step 5: Verify the changes
cat README.md
# You should see Person A's contribution
```

### Person B's Turn

Now Person B repeats the process:
- Create branch: `feature/add-contributor-b`
- Add yourself to Contributors section
- Push and create PR
- Person A reviews and merges

### Questions to Answer
- Q: Why did we start from main branch?
- Q: What happens to the feature branch after merging?
- Q: Why is it good practice to request a review?

---

## Exercise 4: Resolving a Simple Merge Conflict (30 minutes)

**Goal**: Practice handling merge conflicts in a controlled environment.

### Setup: Both People

```bash
git checkout main
git pull origin main
```

### Person A

```bash
# Step 1: Create a branch
git checkout -b feature/update-title-a

# Step 2: Edit the project title in README.md
# Change line 1 from:
# # Financial Management System
# To:
# # Financial Management System - Team Edition

# Step 3: Commit and push
git add README.md
git commit -m "Update title to Team Edition"
git push origin feature/update-title-a

# Step 4: Create PR but DON'T merge yet
# Go to GitHub and create the PR
```

### Person B (While Person A's PR is open)

```bash
# Step 1: Create a different branch from main
git checkout -b feature/update-title-b

# Step 2: Edit the SAME line in README.md
# Change line 1 from:
# # Financial Management System
# To:
# # Financial Management System - Collaborative App

# Step 3: Commit and push
git add README.md
git commit -m "Update title to Collaborative App"
git push origin feature/update-title-b

# Step 4: Create PR
# This will work, but you'll have conflicts after Person A merges
```

### Merge Person A's PR First

Person A: Merge your PR on GitHub

### Person B: Resolve the Conflict

```bash
# Step 1: Your branch is now behind main. Update it:
git checkout feature/update-title-b
git pull origin main

# You'll see a conflict message:
# CONFLICT (content): Merge conflict in README.md

# Step 2: Check status
git status
# Shows README.md as "both modified"

# Step 3: Open README.md
# You'll see:
<<<<<<< HEAD
# Financial Management System - Collaborative App
=======
# Financial Management System - Team Edition
>>>>>>> main

# Step 4: Decide on resolution
# Let's combine both:
# # Financial Management System - Team Collaborative Edition

# Remove the conflict markers (<<<, ===, >>>)

# Step 5: Mark as resolved
git add README.md

# Step 6: Complete the merge
git commit -m "Resolve merge conflict: combine both title suggestions"

# Step 7: Push
git push origin feature/update-title-b

# Step 8: Now your PR can be merged!
# Go to GitHub and merge your PR
```

### Both: Clean Up

```bash
git checkout main
git pull origin main
git branch -d feature/update-title-a
git branch -d feature/update-title-b
```

### Questions to Answer
- Q: What causes a merge conflict?
- Q: What do the conflict markers mean (<<<, ===, >>>)?
- Q: How do you know when a conflict is resolved?
- Q: Can conflicts be prevented? How?

---

## Exercise 5: Using Git Stash (15 minutes)

**Goal**: Learn to temporarily save work without committing.

### Person A

```bash
# Step 1: Start working on a feature
git checkout -b feature/work-in-progress

# Step 2: Make some changes
echo "// Working on new feature" >> backend/src/server.js

# Step 3: Check status
git status
# You'll see modified files

# Step 4: Urgent! Need to fix something on main
# But you don't want to commit incomplete work
git stash save "WIP: new feature in progress"

# Step 5: Verify working directory is clean
git status
# Should say "working tree clean"

# Step 6: Switch to main for urgent fix
git checkout main
git pull origin main

# Step 7: Make urgent fix
git checkout -b hotfix/urgent-fix
echo "// Fixed issue" >> backend/src/server.js
git add .
git commit -m "Fix urgent issue"
git push origin hotfix/urgent-fix

# Step 8: Go back to your work
git checkout feature/work-in-progress

# Step 9: Restore your stashed changes
git stash pop

# Step 10: Verify your changes are back
git status
git diff

# Step 11: Continue working or commit
git add .
git commit -m "Add new feature"
```

### Commands to Practice

```bash
# Save current work
git stash

# Save with descriptive message
git stash save "Description of work"

# List all stashes
git stash list

# Apply most recent stash (keep it in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Delete a stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

### Questions to Answer
- Q: When would you use stash instead of commit?
- Q: What's the difference between `stash pop` and `stash apply`?
- Q: Can you stash multiple times?

---

## Exercise 6: Undoing Mistakes (20 minutes)

**Goal**: Practice safely undoing various types of mistakes.

### Scenario 1: Undo Unstaged Changes

```bash
# Create a test branch
git checkout -b test/undo-practice

# Make a change
echo "Test change" >> test-file.txt

# Oops, didn't mean to do that!
# Undo it:
git checkout -- test-file.txt

# Verify it's undone
git status
```

### Scenario 2: Unstage a File

```bash
# Make a change and stage it
echo "Another test" >> test-file.txt
git add test-file.txt

# Oops, not ready to stage yet!
# Unstage it:
git reset HEAD test-file.txt

# Verify it's unstaged but changes remain
git status
```

### Scenario 3: Undo Last Commit (Not Pushed)

```bash
# Make a commit
echo "Wrong commit" >> test-file.txt
git add test-file.txt
git commit -m "Wrong commit message"

# Oops, that was wrong!
# Undo the commit but keep changes:
git reset --soft HEAD~1

# Verify: commit is gone but changes remain staged
git status

# Or undo completely:
git reset --hard HEAD~1
```

### Scenario 4: Committed to Wrong Branch

```bash
# Accidentally on main
git checkout main
echo "Feature code" >> wrong-branch.txt
git add wrong-branch.txt
git commit -m "Add feature"

# Oops! Should be on feature branch!
# Move commit to correct branch:
git branch feature/correct-branch
git reset --hard HEAD~1
git checkout feature/correct-branch

# Verify the commit is now on correct branch
git log --oneline
```

### Questions to Answer
- Q: What's the difference between `--soft` and `--hard` reset?
- Q: When is it safe to use `reset --hard`?
- Q: What's the difference between `reset` and `revert`?

---

## Exercise 7: Collaborative Feature Development (45 minutes)

**Goal**: Simulate a real-world collaborative feature development.

### The Task

Build a simple "About Us" page together:
- Person A: Creates the HTML structure
- Person B: Creates the CSS styling

### Person A: HTML Structure

```bash
# Step 1: Create branch
git checkout main
git pull origin main
git checkout -b feature/about-us-html

# Step 2: Create the HTML file
# Create: frontend/src/pages/AboutUs.js

# Add this content:
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Our Financial Management System</h1>
      <p>We help you manage your finances efficiently.</p>
      <div className="team">
        <h2>Our Team</h2>
        <p>Built with ❤️ by [Your Names]</p>
      </div>
    </div>
  );
}

export default AboutUs;

# Step 3: Commit and push
git add frontend/src/pages/AboutUs.js
git commit -m "Add AboutUs page HTML structure"
git push origin feature/about-us-html

# Step 4: Create PR but don't merge yet
```

### Person B: CSS Styling (In Parallel!)

```bash
# Step 1: Create branch from main (not from Person A's branch)
git checkout main
git pull origin main
git checkout -b feature/about-us-css

# Step 2: Create the CSS file
# Create: frontend/src/pages/AboutUs.css

# Add this content:
.about-us {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-us h1 {
  color: #333;
  font-size: 2.5rem;
}

.team {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

# Step 3: Commit and push
git add frontend/src/pages/AboutUs.css
git commit -m "Add AboutUs page styling"
git push origin feature/about-us-css

# Step 4: Create PR
```

### Integration

1. **Merge Person A's PR first**
2. **Person B updates their branch**:

```bash
git checkout feature/about-us-css
git pull origin main
# Should merge cleanly since you edited different files!
git push origin feature/about-us-css
```

3. **Merge Person B's PR**

### Verification

```bash
git checkout main
git pull origin main

# Verify both files exist
ls frontend/src/pages/
# Should show: AboutUs.js and AboutUs.css
```

### Questions to Answer
- Q: Why didn't this create a conflict?
- Q: What's the advantage of dividing work this way?
- Q: What would happen if both edited the same file?

---

## Exercise 8: GitHub Issues and Project Management (20 minutes)

**Goal**: Learn to use GitHub Issues for task tracking.

### Person A: Create Issues

1. Go to GitHub → Issues tab → New Issue
2. Create 3 issues:

**Issue 1: Add User Profile Page**
```
Title: Add User Profile Page
Labels: enhancement, frontend
Description:
Create a new user profile page where users can view their information.

Requirements:
- Display user name, email
- Show account creation date
- Add edit button (functionality for later)
```

**Issue 2: Implement Budget Tracker**
```
Title: Implement Budget Tracker
Labels: feature, backend
Description:
Add backend API for budget tracking functionality.

Requirements:
- Create budget model
- Add CRUD endpoints
- Connect to database
```

**Issue 3: Fix Login Button Styling**
```
Title: Fix Login Button Styling
Labels: bug, frontend
Description:
The login button is not properly aligned on mobile devices.

Steps to reproduce:
1. Open login page on mobile
2. Notice button alignment issue
```

### Person B: Create a Project Board

1. Go to GitHub → Projects tab → New Project
2. Name it: "Financial Management Development"
3. Choose template: "Basic Kanban"
4. Add columns:
   - To Do
   - In Progress
   - Review
   - Done

### Both: Link Issues to Project

1. Go to each issue
2. Right sidebar → Projects → Add to your project
3. Drag issues to "To Do" column

### Person A: Work on an Issue

```bash
# Reference the issue number in branch name
git checkout -b feature/user-profile-issue-1

# Make your changes...

# Commit with issue reference
git commit -m "Add user profile page - closes #1"

# Push and create PR
git push origin feature/user-profile-issue-1
# In PR description, mention: "Closes #1"
```

When PR is merged, Issue #1 will automatically close!

### Questions to Answer
- Q: How do you link a PR to an issue?
- Q: What keywords automatically close issues?
- Q: Why use issues instead of just talking?

---

## Exercise 9: Code Review Practice (30 minutes)

**Goal**: Learn to give and receive constructive code reviews.

### Person A: Create PR with Intentional Issues

```bash
git checkout -b feature/needs-review

# Create a file with some issues:
# frontend/src/components/Calculator.js

import React from 'react';

function calculator() {  // Issue: lowercase function name
  const x = 10;
  const y = 20;
  const z = x + y;
  console.log(z);  // Issue: console.log in production code
  return (
    <div>
      <h1>Calculator</h1>
      <p>Result is {z}</p>
    </div>
  );
}

export default calculator;

# Commit and push
git add .
git commit -m "Add calculator component"
git push origin feature/needs-review
```

Create PR on GitHub.

### Person B: Review the Code

1. Go to PR → Files changed
2. Click line numbers to add comments
3. Leave specific, constructive feedback:

**Comment on line 3:**
```
Component names should start with an uppercase letter to follow React conventions.
Suggestion: Rename to `Calculator`
```

**Comment on line 7:**
```
console.log should not be in production code. 
Suggestion: Remove this or use proper logging if needed.
```

4. Click "Review changes" → "Request changes"
5. Write summary:
```
Good start! Just a few minor issues to fix:
- Component naming convention
- Remove console.log

Once these are addressed, this looks good to merge!
```

### Person A: Address Feedback

```bash
# Make the requested changes
git checkout feature/needs-review

# Edit Calculator.js:
import React from 'react';

function Calculator() {  // Fixed: uppercase
  const x = 10;
  const y = 20;
  const z = x + y;
  // Removed console.log
  return (
    <div>
      <h1>Calculator</h1>
      <p>Result is {z}</p>
    </div>
  );
}

export default Calculator;

# Commit
git add .
git commit -m "Address code review feedback: fix naming and remove console.log"
git push origin feature/needs-review
```

### Person B: Re-review and Approve

1. Check new changes
2. Review changes → Approve
3. Merge the PR

### Questions to Answer
- Q: What makes a good code review comment?
- Q: Why is code review important?
- Q: What should you NOT do in a code review?

---

## Exercise 10: Release and Tagging (15 minutes)

**Goal**: Learn to create releases and version tags.

### Both: Prepare for Release

```bash
git checkout main
git pull origin main

# Create a tag for version 1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial collaborative version"

# Push the tag
git push origin v1.0.0
```

### Person A: Create GitHub Release

1. Go to GitHub → Releases → Draft a new release
2. Choose tag: v1.0.0
3. Release title: "Version 1.0.0 - Collaborative Edition"
4. Description:
```
## What's New
- Added collaborative development workflow
- Improved documentation
- Added contributor guidelines

## Contributors
- Person A
- Person B

## Installation
Follow the setup guide in README.md
```
5. Click "Publish release"

### Questions to Answer
- Q: What's the difference between a tag and a branch?
- Q: When should you create a release?
- Q: What is semantic versioning (v1.0.0)?

---

## 🎓 Completion Certificate

After completing all exercises, both of you should be able to:

- ✅ Create and manage branches
- ✅ Make commits with meaningful messages
- ✅ Push and pull changes
- ✅ Create and review Pull Requests
- ✅ Resolve merge conflicts
- ✅ Use git stash for temporary saves
- ✅ Undo mistakes safely
- ✅ Work on features simultaneously
- ✅ Use GitHub Issues and Projects
- ✅ Perform code reviews
- ✅ Create releases and tags

---

## 🚀 Next Steps

Now that you've completed these exercises:

1. **Apply to Real Work**: Use these skills in your actual project development
2. **Establish a Workflow**: Decide on your team's standard workflow
3. **Set Up Branch Protection**: Protect the main branch on GitHub
4. **Create Templates**: Make PR and Issue templates
5. **Learn Advanced Topics**:
   - Git rebase
   - Git cherry-pick
   - GitHub Actions (CI/CD)
   - Git hooks

---

## 📝 Exercise Completion Checklist

- [ ] Exercise 1: Branch Creation and Navigation
- [ ] Exercise 2: Fetching Remote Branches
- [ ] Exercise 3: Creating Pull Requests
- [ ] Exercise 4: Resolving Merge Conflicts
- [ ] Exercise 5: Using Git Stash
- [ ] Exercise 6: Undoing Mistakes
- [ ] Exercise 7: Collaborative Feature Development
- [ ] Exercise 8: GitHub Issues and Project Management
- [ ] Exercise 9: Code Review Practice
- [ ] Exercise 10: Release and Tagging

---

**Congratulations!** 🎉 You're now ready to collaborate effectively using Git and GitHub!

Remember:
- Practice makes perfect
- Don't be afraid to make mistakes (you can always undo them)
- Communicate with your teammate
- When stuck, refer back to the guides

Happy coding together! 👥💻
