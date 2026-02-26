# 🌟 English Adventure! — Interactive A1–A2 Learning Website

An interactive English learning website for children aged 8–12, covering A1–A2 level English grammar and vocabulary.

## 📚 Features

- **CAN / CAN'T** — Library Rules, permissions, abilities
- **Connectors** — AND, BUT, OR with fill-in-the-blank, MCQ, and Sentence Builder
- **Clothes Vocabulary** — Label, match, and write activities
- **Have To / Has To** — Obligation forms with table, fill-blank, MCQ, short answer
- **Playground Writing** — Guided writing with real-time validation
- **Final Locked Quiz** — 20-question comprehensive quiz (submitted only once)
- **Video Lessons** — Embedded YouTube videos with mandatory mini-assessments
- **Progress Tracking** — localStorage-based progress persistence
- **Teacher Mode** — Password-protected teacher controls
- **Bilingual Error Messages** — English and Spanish validation messages
- **Fully Responsive** — Mobile-first design
- **Accessible** — Keyboard navigation, ARIA labels, focus indicators

## 🚀 How to Run Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/english-adventure.git
   cd english-adventure
   ```

2. Open `index.html` in any modern web browser.
   - No server required — it works offline (except embedded YouTube videos).
   - Simply double-click `index.html` or drag it into a browser window.

3. Optionally, use a local server for best experience:
   ```bash
   # Python 3
   python -m http.server 8000
   # Then open: http://localhost:8000
   ```

## 🌐 How to Deploy on GitHub Pages

1. Push the project to a GitHub repository.

2. Go to your repository on GitHub.

3. Click **Settings** → **Pages** (in the left sidebar).

4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`

5. Click **Save**.

6. Your site will be live at:
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

> ⏱️ It may take 1–2 minutes for the site to go live after first deployment.

## 🔐 Teacher Mode

- **Button:** Click "👩‍🏫 Teacher" in the top-right corner
- **Password:** `TEACHER123`
- **Capabilities:**
  - Reset student name
  - Reset final quiz (allows retaking)
  - Reset all progress
  - Show/hide correct answers across all exercises

## 📁 Project Structure

```
/english-learning-site
│
├── index.html          # Main HTML — all screens and structure
├── styles.css          # All CSS — responsive, animated, child-friendly
├── app.js              # All JavaScript — exercises, validation, progress
├── README.md           # This file
└── /assets
    └── icons/          # (SVG icons can be placed here)
```

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, responsive grid
- **Vanilla JavaScript** — No frameworks
- **localStorage** — Persistent student progress
- **Google Fonts** — Nunito + Fredoka One
- **YouTube iFrames** — Embedded educational videos

## 🎨 Design

- Child-friendly color palette (blues, greens, yellows)
- Large touch-friendly buttons
- Smooth animations and transitions
- Emoji-enhanced UI for engagement
- High contrast ratios for accessibility

## ✅ QA Checklist

- [x] Student name validation (2–20 chars, letters/spaces/hyphens only)
- [x] Progress saves after page refresh
- [x] Final quiz locks after submission
- [x] Teacher mode password works
- [x] Teacher can reset name, quiz, and all progress
- [x] Video quizzes gate section completion
- [x] Writing validation (capital, period, required words)
- [x] Bilingual error messages
- [x] Fully responsive (mobile-first)
- [x] No console errors
- [x] Keyboard navigation and ARIA labels
- [x] Hint system on exercises

## 📄 License

MIT — Free for educational use.
