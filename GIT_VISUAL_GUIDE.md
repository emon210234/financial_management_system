# Git Concepts Visualized

This guide uses ASCII diagrams to help you visualize how Git works. Understanding these concepts will make Git much less mysterious!

---

## 📊 The Three Areas of Git

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                                │
├───────────────────┬──────────────────┬─────────────────────────┤
│                   │                  │                          │
│  Working          │  Staging Area    │  Local Repository        │
│  Directory        │  (Index)         │  (.git folder)          │
│                   │                  │                          │
│  Your actual      │  Changes marked  │  Committed snapshots     │
│  files            │  for commit      │  of your project         │
│                   │                  │                          │
└───────────────────┴──────────────────┴──────────────────────────┘
       │                    │                      │
       │  git add           │  git commit          │  git push
       └───────────────────>└──────────────────────>──────────────>
                                                                    │
┌───────────────────────────────────────────────────────────────────┘
│
│  ┌────────────────────────────────────────────┐
│  │         GITHUB (Remote)                    │
│  │                                            │
│  │  Remote Repository                         │
│  │  (Shared with team)                        │
│  │                                            │
│  └────────────────────────────────────────────┘
```

---

## 🌳 How Branches Work

### Initial State (Just Main)

```
main
  │
  ├──[A]──[B]──[C]  (commits on main)
         HEAD^
```

### Creating a Branch

When you run: `git checkout -b feature/new-feature`

```
                    feature/new-feature (new branch)
                   /
main              /
  │              /
  ├──[A]──[B]──[C]
              HEAD (you are here)
```

### Working on Your Branch

After making commits on `feature/new-feature`:

```
                    feature/new-feature
                   /
main              /──[D]──[E]
  │              /        HEAD (you are here)
  ├──[A]──[B]──[C]
```

### Meanwhile, Your Friend Works on Main

```
                    feature/new-feature
                   /
main              /──[D]──[E]
  │              /        (you)
  ├──[A]──[B]──[C]──[F]
                    (friend merged their work)
```

### Merging Your Branch Back

After creating PR and merging:

```
main              
  │              
  ├──[A]──[B]──[C]──[F]──[M]
              \           /
               \─[D]─[E]─/ 
                   (your work merged)
```

---

## 🔄 Understanding Git Pull

### Before Pull

**Your Local:**
```
main (local)
  │
  ├──[A]──[B]
          HEAD
```

**GitHub (origin):**
```
main (remote)
  │
  ├──[A]──[B]──[C]──[D]
                    (friend pushed C and D)
```

### After Git Pull

`git pull origin main` downloads and merges:

```
main (local)
  │
  ├──[A]──[B]──[C]──[D]
                    HEAD (now up to date!)
```

---

## ⚡ Git Fetch vs Git Pull

### Git Fetch

Downloads changes but doesn't merge:

```
BEFORE FETCH:
Your local main:        origin/main (cached):
     main                    origin/main
      │                           │
  ├──[A]──[B]                 ├──[A]──[B]
          HEAD

AFTER FETCH:
Your local main:        origin/main (updated):
     main                    origin/main
      │                           │
  ├──[A]──[B]                 ├──[A]──[B]──[C]──[D]
          HEAD                              (new!)
```

You can now review changes before merging.

### Git Pull = Fetch + Merge

```
git pull = git fetch + git merge

Fetches:  origin/main ──┐
                        ├──> Merges into ──> main
Your local: main ───────┘
```

---

## 🔀 Merge vs Rebase

### Merge (Safe & Simple)

**Before:**
```
          feature
         /
main    /──[D]──[E]
  │    /
  ├──[A]──[B]──[C]
```

**After `git merge main` on feature branch:**
```
          feature
         /          \
main    /──[D]──[E]──[M] (merge commit)
  │    /           /
  ├──[A]──[B]──[C]/
```

### Rebase (Cleaner History)

**Before:**
```
          feature
         /
main    /──[D]──[E]
  │    /
  ├──[A]──[B]──[C]
```

**After `git rebase main` on feature branch:**
```
main             feature
  │             /
  ├──[A]──[B]──[C]──[D']──[E']
                    (commits moved)
```

---

## 🎯 Merge Conflicts

### What Causes Conflicts

**Person A's Branch:**
```
file.js line 10: const name = "Alice";
```

**Person B's Branch:**
```
file.js line 10: const name = "Bob";
```

**When Merging:**
```
Git thinks: "Wait! Both changed line 10 differently.
             I don't know which to keep!"
```

### What You See

```javascript
<<<<<<< HEAD (your changes)
const name = "Alice";
=======
const name = "Bob";
>>>>>>> feature/branch-name (their changes)
```

### After Resolution

```javascript
const name = "Alice and Bob"; // or whatever you decide
```

---

## 🔙 Git Reset Explained

### The Three Types

```
COMMITS:  [A]──[B]──[C]──[D]
                        HEAD

git reset --soft HEAD~1
→ Moves HEAD back, keeps changes staged
→ [A]──[B]──[C]
          HEAD
   Changes: Staged ✓
   Files: Modified ✓

git reset HEAD~1 (or --mixed)
→ Moves HEAD back, keeps changes unstaged
→ [A]──[B]──[C]
          HEAD
   Changes: Unstaged
   Files: Modified ✓

git reset --hard HEAD~1
→ Moves HEAD back, discards all changes
→ [A]──[B]──[C]
          HEAD
   Changes: Gone ✗
   Files: Original ✗
```

---

## 📦 Git Stash Visualized

### Before Stash

```
Working Directory: [Modified files]
Staging Area:      [Staged changes]
         ↓
    git stash
         ↓
```

### After Stash

```
Working Directory: [Clean]
Staging Area:      [Empty]
Stash Stack:       [Stashed changes] ← saved here
                   [Older stash]
                   [Even older stash]
```

### After Pop

```
         ↓
    git stash pop
         ↓
Working Directory: [Modified files] ← restored!
Staging Area:      [Staged changes] ← restored!
Stash Stack:       [Older stash]     ← removed from stack
```

---

## 🏷️ Tags vs Branches

### Branch (Moves with Commits)

```
Feature branch (moves as you commit):
     feature
        │
  ├──[A]──[B]
            HEAD

After new commit:
     feature
        │
  ├──[A]──[B]──[C]
                HEAD (branch moved forward)
```

### Tag (Stays on One Commit)

```
Tagged commit (doesn't move):
     v1.0.0
        │
  ├──[A]──[B]──[C]
                HEAD

After new commit:
     v1.0.0
        │
  ├──[A]──[B]──[C]──[D]
                    HEAD (tag stays on B)
```

---

## 🔄 Collaborative Workflow Visualization

### The Big Picture

```
┌─────────────────────────────────────────────────────────────────┐
│                         GITHUB (origin)                          │
│                                                                  │
│  main: [A]──[B]──[C]──[D]                                       │
│                                                                  │
└──────────────┬──────────────────────────────┬──────────────────┘
               │                              │
        git clone                      git clone
               │                              │
               ↓                              ↓
┌──────────────────────────┐  ┌──────────────────────────┐
│    PERSON A'S COMPUTER   │  │    PERSON B'S COMPUTER   │
│                          │  │                          │
│  main: [A]──[B]──[C]──[D]│  │  main: [A]──[B]──[C]──[D]│
│             \            │  │             \            │
│              \           │  │              \           │
│  feature-a:   [E]──[F]   │  │  feature-b:   [G]──[H]   │
│                          │  │                          │
└──────────┬───────────────┘  └─────────────┬────────────┘
           │                                │
    git push origin                  git push origin
     feature-a                         feature-b
           │                                │
           └────────────┬───────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │  Create Pull Requests         │
         └──────────────┬────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │  Review Each Other's Code     │
         └──────────────┬────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │  Merge to Main (one at a time)│
         └──────────────┬────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────┐
│                    GITHUB (origin)                         │
│                                                            │
│  main: [A]──[B]──[C]──[D]──[M1]──[M2]                     │
│             \               /\    /                        │
│              \──[E]──[F]──/  \──[G]──[H]                  │
│                feature-a       feature-b                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🚨 Common Mistake Scenarios

### Scenario 1: Forgot to Create Branch

```
OOPS! Committed to main:
main
  │
  ├──[A]──[B]──[C]──[D] ← Shouldn't be here!
                    HEAD

FIX:
Step 1: Create branch with current work
git branch feature/my-work

Step 2: Reset main to before your commits
git checkout main
git reset --hard origin/main

Result:
main
  │
  ├──[A]──[B]──[C]
              origin/main
              
          feature/my-work
         /
        /──[D]
       /   HEAD
  ├──[A]──[B]──[C]
```

### Scenario 2: Merge Conflict

```
BEFORE MERGE:
Your branch:      main:
    you              main
     │                │
  ├──[C]           ├──[C]──[X]
      \               /
       [A]──[B]  (friend's work)

Both modified same file!

AFTER PULL (Conflict!):
main
  │
  ├──[C]──[X]
      \    \
       [A]──[B]
            HEAD
    file.js (conflicted)
    
AFTER RESOLUTION:
main
  │
  ├──[C]──[X]──[M]
      \         /
       [A]──[B]
            (resolved)
```

---

## 🎓 Understanding HEAD

### HEAD Points to Current Location

```
Attached HEAD (on a branch):
     feature
        │
  ├──[A]──[B]──[C]
              HEAD
              
Detached HEAD (not on a branch):
     (no branch)
        │
  ├──[A]──[B]──[C]
              HEAD
              
Moving HEAD:
git checkout main     → HEAD moves to main
git checkout feature  → HEAD moves to feature
git checkout <commit> → HEAD detaches at commit
```

---

## 🌐 Remote Tracking

### How Local and Remote Connect

```
LOCAL:
  main ──tracks──> origin/main (cached copy)
                          ↕
                    (git fetch/push)
                          ↕
REMOTE (GitHub):          │
  main <──────────────────┘
  

Your workflow:
1. git fetch origin
   Updates: origin/main (cached)
   
2. Review: git log origin/main
   
3. git merge origin/main
   Updates: main (local)
   
4. Make changes
   
5. git push origin main
   Updates: main (remote)
```

---

## 🔍 Git Log Visualization

### Understanding Commit History

```
git log --oneline --graph --all

Output:
*   d8a9c2f (HEAD -> main) Merge feature-b
|\
| * 9f4e3a1 (feature-b) Add feature B part 2
| * 7c2b1d0 Add feature B part 1
* | 5e3d2c1 Update main directly
|/
*   4b9a8f0 Merge feature-a
|\
| * 3a8b7e2 (feature-a) Implement feature A
|/
* 2c1d9f8 Initial commit

Reading the graph:
* = commit
| = branch line
/ \ = branch/merge
(HEAD -> main) = current position
(feature-b) = branch name
```

---

## 🎯 Pull Request Flow

```
Step 1: Create feature branch
        
        feature/new-button
       /
main  /──[A]
     /   
  ├─[C]


Step 2: Push to GitHub

GITHUB:
  main: [C]
  feature/new-button: [A]


Step 3: Open Pull Request

┌─────────────────────────────────┐
│  Pull Request #42                │
│  feature/new-button → main       │
│                                  │
│  [Code Changes]                  │
│  [Discussion]                    │
│  [Review Status: Pending]        │
└─────────────────────────────────┘


Step 4: After Review & Merge

GITHUB:
  main: [C]──[M]
            /
    [A]───/
    feature/new-button (can be deleted)


Step 5: Update local

LOCAL:
git checkout main
git pull origin main

main: [C]──[M]
          HEAD
```

---

## 🔄 Cherry-Pick Visualization

### What is Cherry-Pick?

Moving a single commit from one branch to another:

```
BEFORE:
    feature
   /
  [A]──[B]──[C]  (want to move B to main)

main
  │
  ├──[X]──[Y]


COMMAND:
git checkout main
git cherry-pick <commit-B-hash>


AFTER:
    feature
   /
  [A]──[B]──[C]

main
  │
  ├──[X]──[Y]──[B'] (copy of B)
```

---

## 💡 Mental Model Summary

### Think of Git As...

**A Timeline with Branches:**
```
       Timeline 1 (main)
      ─────────────────>
     /
    / Timeline 2 (feature)
   ─────────────>
```

**A Save Game System:**
```
Save Point 1 → Save Point 2 → Save Point 3
  (commit)       (commit)       (commit)
  
You can always go back to any save point!
```

**A Tree Structure:**
```
            main (trunk)
              │
         ┌────┴────┐
    feature-a   feature-b (branches)
         │          │
        ...        ...
```

---

## 🎯 Quick Reference Diagrams

### Create Branch
```
Before:  main──>[A]──[B]
               
After:   main──>[A]──[B]
                      \
                   feature──>[B]
```

### Commit
```
Before:  feature──>[B]──[C]
                        HEAD
               
After:   feature──>[B]──[C]──[D]
                              HEAD
```

### Push
```
Local:   feature──>[B]──[C]──[D]
                              HEAD
              git push ↓
Remote:  feature──>[B]──[C]──[D]
```

### Pull
```
Remote:  main──>[A]──[B]──[C]

              git pull ↓
              
Local:   main──>[A]──[B]──[C]
                            HEAD
```

### Merge
```
Before:  main──>[A]──[B]
              \
           feature──>[C]──[D]
           
After:   main──>[A]──[B]──[M]
              \            /
           feature──>[C]──[D]
```

---

## 🎓 Conclusion

These visualizations should help you understand:
- ✅ Where your code lives (working dir, staging, repo)
- ✅ How branches work (parallel timelines)
- ✅ What commits are (save points)
- ✅ How collaboration works (sharing through GitHub)
- ✅ What happens during merge conflicts
- ✅ How to safely undo changes

**Remember**: Git is just a tool to:
1. Save snapshots of your code (commits)
2. Work on different versions (branches)
3. Share with others (push/pull)
4. Combine work (merge)

Once you understand these basics visually, everything else is just variations and combinations of these concepts!

---

**Pro Tip**: Draw these diagrams on paper when you're confused. It really helps!

*Last Updated: 2026-01-18*
