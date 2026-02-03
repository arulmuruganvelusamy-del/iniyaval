# INIYA: A Valentine's World — Complete Feature List

Everything in this site: every section, interaction, and cute detail.

---

## 🚪 GATE (First thing she sees)

| Feature | What it does |
|--------|----------------|
| **Will you be my Valentine?** | Full-screen gate loads first. She must open this before the main site. |
| **Bear + heart SVG** | Cute illustration: bear holding a heart. |
| **Yes / No buttons** | Yes = celebration. No = runs away when cursor gets close (playful). |
| **Yes grows** | Each time she chases "No," the Yes button gets a little bigger. |
| **Hint** | "No seems a bit shy 😈" under the buttons. |
| **On Yes** | Buttons and hint hide → **YAY! 🎉** + fireworks GIF + full-screen confetti. |
| **Enter your Valentine's World** | Button appears; clicking it hides the gate and shows the main site. |
| **Gate card entrance** | Card does a soft scale + fade-in when the gate loads. |

---

## 🌍 MAIN WORLD (After she clicks Enter)

### Top bar & global

| Feature | What it does |
|--------|----------------|
| **Scroll progress bar** | Thin coral bar at the very top. Fills left→right as she scrolls (0% at top, 100% at bottom). Shows “progress through the story.” |
| **Music toggle** | Top-right button (♪). Play/pause background music. Muted state shows ⊘. (Music file path is in `config.js`.) |
| **Cursor / touch trail** | Soft pink trail follows the mouse or finger. |
| **Scroll to top** | ↑ button at bottom-right appears after she scrolls past the opening. One tap smoothly scrolls back to the top. |
| **Escape key** | Closes the Special Notes modal or the open letter (envelope) when open. |

---

### 1️⃣ Opening scene

| Feature | What it does |
|--------|----------------|
| **Tagline** | “Welcome to Iniya's World” (editable in config). |
| **Main line** | “Iniya, this world exists because you quietly changed mine.” (editable). |
| **Name “Iniya”** | Animates **letter by letter** with a soft glow (each letter fades up with a short delay). |
| **Starry sky** | Soft pink/cream gradient + twinkling coral “stars” on the opening canvas. |
| **Heart trees** | Three trees at the bottom: trunks and branches made of hearts, heart “leaves” that fall, sparkle, and reform. Trees sway slightly with cursor/touch. |
| **Floating hearts** | ~40 small hearts drift slowly upward in the background. |
| **Scroll hint** | Bouncing ↓ at the bottom to encourage scrolling. |
| **Double-tap easter egg** | Double-tap (or double-click) on **Iniya’s name** → burst of coral confetti in the center. |

---

### 2️⃣ Letter (envelope)

| Feature | What it does |
|--------|----------------|
| **Section title** | “A letter for you.” |
| **Hint** | “Tap gently — this one comes from the heart.” |
| **Envelope** | Looks like a real envelope: rectangular body + triangular flap (cream/white). |
| **Tap to open** | Tap envelope → flap rotates back (3D-style) and the letter slides up and expands. |
| **Letter content** | Full message from config (your long letter to Iniya). Scrollable. |
| **Close** | “Close” button appears when the letter is open; tap to tuck the letter back. |
| **Open/close glow** | Letter area gets a short glow when it opens. |

---

### 3️⃣ Our Heart Tree

| Feature | What it does |
|--------|----------------|
| **Section title** | “Our Heart Tree.” |
| **Hint** | “Tap anywhere to add a heart ♡.” |
| **One big tree** | Single central tree drawn on a full-width canvas. |
| **Tree built from hearts** | **Trunk:** 5 stacked hearts. **Branches:** chains of small hearts (not lines). **Leaves:** glowing hearts on branches that fall, turn into sparkles, then reappear. Tree sways with cursor/touch. |
| **Tap to add hearts** | Tap/click anywhere on the canvas → 5 hearts spawn at that spot, float upward, then fade out. |
| **Heart counter** | “You've added 0 hearts ♡” under the hint. Updates every tap (e.g. 5, 10, 15…). Does a small pop when the number changes. |

---

### 4️⃣ Section dividers

| Feature | What it does |
|--------|----------------|
| **♡ between sections** | Small heart symbols (♡) between: Heart Tree → Our Story → Memories → Special Notes → Why I Like You → Final. Soft coral, spaced. |

---

### 5️⃣ Our Story

| Feature | What it does |
|--------|----------------|
| **Section title** | “Our Story” (animates when it scrolls into view). |
| **Message cards** | Editable in config (`ourStory` array). Each card is a floating-style box with one message. |
| **Scroll-in** | Cards fade up as they enter the viewport (staggered). |
| **Hover** | Card lifts a bit and gets a slight rotation + stronger shadow. |
| **Active** | Slight press effect (scale down) on tap/click. |
| **Background** | Heart trees on the canvas behind the section. |

---

### 6️⃣ Memories (gallery)

| Feature | What it does |
|--------|----------------|
| **Section title** | “Memories.” |
| **Polaroid-style photos** | Images from config (`galleryImages`) shown as polaroids: white border, soft shadow, slight rotation (alternating left/right). |
| **Scroll-in** | Each photo fades up when it comes into view. |
| **Hover** | Photo lifts, straightens a bit, and glows. |
| **Supports 10–20 images** | Add paths in config; place files in `images/` folder. |
| **Background** | Heart trees on canvas. |

---

### 7️⃣ Special Notes

| Feature | What it does |
|--------|----------------|
| **Section title** | “Special Notes.” |
| **Hint** | “Tap the hearts.” |
| **Hearts** | Row of heart buttons. Each opens a different message (from config `loveNotes`). |
| **Floating hearts** | Hearts have a gentle float animation (slight bounce). |
| **Hover** | Heart scales up. |
| **Active** | Slight scale down on tap. |
| **Modal** | Tap a heart → modal opens with that note. White card, soft shadow, short glow on open. |
| **Close** | × button or tap outside the card. Escape key also closes. |
| **Background** | Heart trees on canvas. |

---

### 8️⃣ Why I Like You

| Feature | What it does |
|--------|----------------|
| **Section title** | “Why I Like You.” |
| **List** | Editable in config (`whyILoveYou`). Each item = one reason with a small heart icon. |
| **Scroll-in** | List items fade in as they enter the viewport (staggered). |
| **Hover** | Item gets a light border glow and slides slightly right. |
| **Background** | Soft gradient (no canvas). |

---

### 9️⃣ Final scene

| Feature | What it does |
|--------|----------------|
| **Big message** | “Happy Valentine's Day, Iniya ❤️” (editable in config). |
| **Breathing glow** | Text has a very soft pulse (opacity/brightness). |
| **Button** | “This Is Just the Beginning” (editable). Tap → smooth scroll back to the opening scene. |
| **Hover** | Button scales up and glows. |
| **Active** | Slight scale down on tap. |
| **Background** | Heart trees on canvas. |

---

## 🎨 VISUAL & FEEL

| Feature | What it does |
|--------|----------------|
| **Bright palette** | Blush pinks, coral, cream, lavender, soft gold. Light gradients everywhere. |
| **Heart trees everywhere** | Opening (3 trees), Heart Tree section (1 big tree), Our Story, Memories, Special Notes, Final — all use the same “tree made of hearts” style. |
| **Falling heart leaves** | On trees: heart “leaves” detach, fall, dissolve into sparkles, then respawn. |
| **Sway** | Trees sway slightly based on cursor/touch position. |
| **Custom selection** | Selecting text gives a soft coral highlight. |
| **Focus** | Keyboard focus shows a clear coral outline (accessibility). |
| **Reduced motion** | If the user has “reduce motion” on, animations are minimized. |
| **Main world entrance** | When she clicks “Enter your Valentine’s World,” the main site fades in (no hard cut). |
| **Section titles on scroll** | Section titles (Our Heart Tree, Our Story, etc.) only animate when they scroll into view, not all at once on load. |

---

## ⚙️ EDITABLE IN CONFIG (`js/config.js`)

| What | Config key |
|------|------------|
| Opening tagline, main line, her name | `opening` |
| Our Story card texts | `ourStory` (array) |
| Gallery image paths | `galleryImages` (array) |
| Special Notes messages | `loveNotes` (array) |
| Why I Like You reasons | `whyILoveYou` (array) |
| Full letter text | `letter` (long string) |
| Final message + button text | `final` |
| Music on/off + file path | `music` |

---

## 📁 FILES

| File | Role |
|------|------|
| `index.html` | Structure: gate, main world, all sections, canvases, buttons. |
| `css/styles.css` | All styling: layout, colors, animations, responsive, progress bar, dividers, etc. |
| `js/config.js` | All editable copy and settings (no logic). |
| `js/heart-tree.js` | Heart tree: trunk/branches/leaves as hearts, falling leaves, sparkles, sway. |
| `js/particles.js` | Floating hearts + cursor/touch trail. |
| `js/app.js` | Init, gate logic, scroll, canvases, modals, music, progress bar, heart counter, Escape, double-tap confetti. |
| `images/` | Put your gallery photos here (e.g. memory1.jpg). |
| `audio/` | Put `background.mp3` here for optional music. |

---

## 🎁 CUTE / LITTLE TOUCHES

- **No button runs away** when the cursor gets near.
- **Yes button grows** each time she “chases” No.
- **Name animates letter by letter** with a glow.
- **Double-tap her name** → confetti.
- **Tap anywhere on the heart tree** → hearts float up and fade.
- **Heart counter** (“You've added X hearts ♡”) with a pop when it updates.
- **Scroll progress bar** so she sees how far through the story she is.
- **♡ dividers** between sections.
- **Polaroid photos** with slight rotation and lift on hover.
- **Story cards** lift and tilt on hover.
- **Special Notes hearts** float gently and scale on hover/tap.
- **Final message** has a soft “breathing” glow.
- **Cursor trail** follows her finger/mouse.
- **Escape** closes modals and the letter.
- **Scroll to top** appears after she scrolls down.
- **Main world fades in** when she enters.
- **Section titles** animate only when they scroll into view.

That’s everything in the site: every feature and cute detail.
