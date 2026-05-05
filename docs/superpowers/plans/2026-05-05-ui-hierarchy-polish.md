# UI Hierarchy Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve visual hierarchy and polish of the existing Vue portfolio without changing app architecture or committing to git.

**Architecture:** Keep current single-page Vue component structure. Add a small hero signal row in `HeroSection.vue`; implement most polish through existing BEM-style classes in `src/style.css`.

**Tech Stack:** Vue 3, TypeScript, Vite, Tailwind CSS v4 CSS layers, GSAP.

---

## Files
- Modify: `src/components/HeroSection.vue` — add credibility/signal row and include it in entrance animation.
- Modify: `src/style.css` — polish nav, hero, section rhythm, cards, timeline, skills, contact.
- Verify: `npm run build`.

### Task 1: Hero signal row

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Update hero animation to include signals**

Replace the `.from('.hero__actions'...)` block with actions plus signals:

```ts
  .from('.hero__actions', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.3')
  .from('.hero__signals', {
    y: 18,
    opacity: 0,
    duration: 0.6,
  }, '-=0.25')
```

- [ ] **Step 2: Add signal row markup after CTA actions**

Insert after `</div>` closing `.hero__actions`:

```vue
      <dl class="hero__signals" aria-label="Professional highlights">
        <div class="hero__signal">
          <dt class="hero__signal-value">8+</dt>
          <dd class="hero__signal-label">Years building products</dd>
        </div>
        <div class="hero__signal">
          <dt class="hero__signal-value">Fintech</dt>
          <dd class="hero__signal-label">High-volume systems</dd>
        </div>
        <div class="hero__signal">
          <dt class="hero__signal-value">API-first</dt>
          <dd class="hero__signal-label">Backend-heavy fullstack</dd>
        </div>
      </dl>
```

### Task 2: CSS hierarchy polish

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Add ambient app background**

Add pseudo elements to `.app`:

```css
  .app::before,
  .app::after {
    content: '';
    position: fixed;
    width: 28rem;
    height: 28rem;
    border-radius: 9999px;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    opacity: 0.12;
  }

  .app::before {
    top: 8rem;
    left: -10rem;
    background: var(--color-accent-warm);
  }

  .app::after {
    right: -12rem;
    bottom: 6rem;
    background: var(--color-text-primary);
    opacity: 0.06;
  }
```

- [ ] **Step 2: Improve nav visual hierarchy**

Update `.nav`, `.nav__link`, `.nav__link--active`, mobile menu with stronger border/shadow/active indicator.

- [ ] **Step 3: Improve hero and buttons**

Add hero radial background, text gradient on name, stronger primary button shadow, full-width mobile buttons, and CSS for `.hero__signals`.

- [ ] **Step 4: Improve global section rhythm**

Add shared rules for `.about`, `.experience`, `.skills`, `.contact`, and header spacing.

- [ ] **Step 5: Improve cards/timeline/skills/contact**

Tune card shadows, experience cards, skills category emphasis, contact CTA/link hierarchy.

### Task 3: Verify

**Files:**
- Verify only

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: TypeScript and Vite build pass.

- [ ] **Step 2: Do not commit**

User explicitly requested no git commits.
