# All messages and where to change them

Use this as a checklist when you want to edit text. Each section lists the message and the **exact file + location**.

---

## 1. Gate (first screen: “Will you be my Valentine?”)

**File: `index.html`**

| What you see | Where to change |
|--------------|-----------------|
| **Page title (browser tab)** | Line 6: `<title>For Iniya — A Love Story</title>` |
| **Main question** | Line 27: `<h1 class="gate-title">Iniya, will you be my valentine?</h1>` |
| **Yes button** | Line 29: `<button ... id="gateYesBtn" ...>Yes</button>` |
| **No button** | Line 30: `<button ... id="gateNoBtn" ...>No</button>` |
| **Hint under buttons** | Line 32: `<p class="gate-hint" ...>"No" seems a bit shy 😈</p>` |
| **After Yes: title** | Line 34: `<h2 class="gate-result-title">YAY! 🎉</h2>` |
| **After Yes: hint** | Line 36: `<p class="gate-enter-hint">Your surprise is ready...</p>` |
| **After Yes: button** | Line 37: `<button ... id="gateEnterBtn" ...>Enter your Valentine's World →</button>` |

---

## 2. Main site (after “Enter your Valentine’s World”)

**File: `js/config.js`** — almost all main-site text comes from here.

### Opening scene (first section inside the world)

| What you see | Config key | Current text |
|--------------|------------|--------------|
| **Tagline** | `opening.tagline` | `"Welcome to Iniya's World"` |
| **Main line** | `opening.mainLine` | `"Iniya, this world exists because you exist."` |
| **Name (letter-by-letter)** | `opening.herName` | `"Iniya"` |

### Letter section

| What you see | Where |
|--------------|--------|
| **Section title** | `index.html` line 62: `A letter for you` |
| **Hint** | `index.html` line 63: `Tap the envelope to open` |
| **Close button** | `index.html` line 74: `Close letter` |
| **Full letter text** | `js/config.js` → `letter:` (the long template string, lines ~67–95) |

**Letter text in config (abbreviated):**
- Starts: `Iniya,\n\nValentine's Day always makes people rush to define love...`
- Ends: `...Always yours, in my own way,\nArul`

### Our Story (floating cards)

**File: `js/config.js`** → `ourStory: [ ... ]`

1. `"The day we met, something shifted."`
2. `"Every moment with you feels like a little miracle."`
3. `"You make ordinary days extraordinary."`
4. `"Here's to our story — and every chapter we'll write."`

(Add or remove lines in the `ourStory` array to change cards.)

### Section titles (Our Story, Memories, Love Notes, Why I Love You)

**File: `index.html`**

- Line 82: **Our Story**
- Line 90: **Memories**
- Line 99: **Love Notes** (and line 100: **Tap the hearts**)
- Line 81: **Why I Love You**

### Love Notes (messages when she taps hearts)

**File: `js/config.js`** → `loveNotes: [ ... ]`

1. `"You are my favorite place to be."`
2. `"I fall for you more every day."`
3. `"With you, everything feels right."`
4. `"You're the best thing that ever happened to me."`
5. `"My heart is yours, always."`
6. `"Thank you for being you."`
7. `"I love us."`
8. `"Forever isn't long enough."`

(Add/remove/edit strings in `loveNotes` to change what each heart says.)

### Why I Love You (list)

**File: `js/config.js`** → `whyILoveYou: [ ... ]`

1. `"Your smile lights up my world"`
2. `"The way you care about the little things"`
3. `"Your laugh is my favorite sound"`
4. `"You make me want to be better"`
5. `"You're brave and kind and true"`
6. `"Every adventure with you is an adventure worth having"`
7. `"You see the good in people"`
8. `"You're my safe place and my excitement"`
9. `"You never stop surprising me"`
10. `"You're simply you — and that's everything"`

(Add/remove/edit strings in `whyILoveYou`.)

### Final scene

**File: `js/config.js`** → `final: { ... }`

| What you see | Config key | Current text |
|--------------|------------|--------------|
| **Big message** | `final.message` | `"Happy Valentine's Day, Iniya"` (site adds ❤️ after it) |
| **Button** | `final.buttonText` | `"Forever Starts Here"` |

---

## 3. Gallery images

**File: `js/config.js`** → `galleryImages: [ ... ]`

Current list: `"images/memory1.jpg"` through `"images/memory10.jpg"`.  
Change these paths to your own image filenames; put the files in the `images/` folder.

---

## 4. Music

**File: `js/config.js`** → `music: { enabled: true, src: "audio/background.mp3" }`  
Put your audio file in the `audio/` folder and set `src` if needed.

---

## Quick reference: “I want to change…”

| If you want to change… | Open this file | Look for… |
|------------------------|----------------|-----------|
| Gate question, Yes/No, “YAY!”, “Enter your Valentine’s World” | `index.html` | Lines 6, 27, 29–30, 32, 34, 36–37 |
| Opening “Welcome to Iniya’s World”, main line, name | `js/config.js` | `opening:` |
| “A letter for you”, “Tap the envelope”, “Close letter” | `index.html` | Lines 62–63, 74 |
| The long letter inside the envelope | `js/config.js` | `letter:` (big string) |
| Our Story card texts | `js/config.js` | `ourStory: [ ... ]` |
| Section titles “Our Story”, “Memories”, etc. | `index.html` | Lines 82, 90, 99–100, 81 |
| Love note messages (hearts) | `js/config.js` | `loveNotes: [ ... ]` |
| “Why I Love You” list | `js/config.js` | `whyILoveYou: [ ... ]` |
| Final “Happy Valentine’s Day” + button | `js/config.js` | `final: { message, buttonText }` |
| Gallery image paths | `js/config.js` | `galleryImages: [ ... ]` |
