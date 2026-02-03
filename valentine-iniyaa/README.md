# For Iniya — A Valentine's Love Story

A one-page immersive Valentine's Day website. Heart-tree forest, floating hearts, editable messages, and memories gallery.

## Quick start

1. **Entry point for Iniya:** Open the “Will you be my Valentine?” page first so she sees that before the main site:
   - Open `../Downloads/index.html` (or the full path to that file). She clicks **Yes** → sees the celebration image → then clicks **“Open your surprise →”** to come to this Valentine site.
2. To run this site locally, open `index.html` in a browser, or run a local server:
   ```bash
   cd valentine-iniyaa
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080`

2. **Edit everything** in `js/config.js`:
   - Opening line and her name
   - Our Story messages (add/remove lines)
   - Gallery image paths (`images/memory1.jpg`, etc.)
   - Love Notes messages
   - Why I Love You list
   - Final message and button text

3. **Add your photos**: Put images in the `images/` folder and set paths in `config.js` → `galleryImages`. Use names like `memory1.jpg`, `memory2.jpg`, etc. (10–20 supported.)

4. **Optional music**: Add an MP3 file to `audio/background.mp3` and set `music.enabled: true` in `config.js`. Toggle with the ♪ button on the page.

## Structure

- `index.html` — Page structure (sections only; no content)
- `css/styles.css` — Colors, layout, animations
- `js/config.js` — **All editable text and image paths**
- `js/heart-tree.js` — Heart trees (trunks + falling hearts + sparkles)
- `js/particles.js` — Floating hearts and cursor trail
- `js/app.js` — Initialization, scroll, modals, music

## Customization

- Change **colors** in `css/styles.css` (`:root` variables: `--blush`, `--pastel-red`, `--warm-purple`, `--starlight`, etc.)
- Add/remove **story cards**, **love notes**, or **reasons** by editing the arrays in `config.js`
- Add/remove **gallery images** by editing `galleryImages` in `config.js`

No need to touch `heart-tree.js` or `app.js` unless you want to change behavior.
