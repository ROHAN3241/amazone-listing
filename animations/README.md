# Franchise Agreement Signing — Premium Animation

A self-contained, single-file HTML animation of a franchise agreement signing scene. Designed to be screen-recorded and embedded in a professional franchise pitch video.

---

## What It Is

A **7-second looping motion graphic** built with HTML5 Canvas, SVG, and CSS animations. No build tools, no npm, no frameworks — everything is inlined in one `.html` file.

### Animation Sequence

| Time | What Happens |
|------|-------------|
| 0 – 1 s | Dark navy gradient background with glowing ambient rays and floating gold particles |
| 1 – 2 s | Franchise agreement document slides up into frame (glass morphism, golden border) |
| 2 – 4 s | Hand silhouette holding a gold pen draws a cursive signature (SVG ink trail) |
| 4 – 5 s | Glowing golden checkmark appears with a particle burst |
| 5 – 6.5 s | Typewriter text: **"Step 1: Sign the Franchise Agreement"** |
| 6.5 – 7 s | Smooth fade-out → auto-loops |

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep navy | `#0a1628` | Background start |
| Navy light | `#1a2d4a` | Background end / document fill |
| Royal gold | `#d4af37` | All accents, pen, checkmark, particles |
| White | `#ffffff` | Text |

---

## How to Open

1. Download or locate `franchise-agreement-signing.html` in this folder.
2. **Double-click** the file — it opens directly in Google Chrome (or any modern browser: Chrome, Firefox, Edge, or Safari).
3. Press **F11** (Windows/Linux) or **Control + Command + F** (Mac) for fullscreen.
4. The animation loops automatically. No internet required after the page first loads (only Google Fonts CDN is fetched once).

---

## How to Screen-Record for Video Use

### Option A — OBS Studio (recommended, free)
1. Open OBS → **Sources** → click **+** → select **Window Capture** → choose the Chrome window.
2. In **Settings → Output**, set format to **MP4**, encoder to **x264**, and bitrate to **8000 kbps** for high quality.
3. Set **Settings → Video** to **1920×1080**, **60 fps**.
4. Click **Start Recording**, wait for at least one full loop, then **Stop Recording**.
5. Import the `.mp4` into your video editor (Premiere Pro, DaVinci Resolve, CapCut, etc.) and trim to a single 7-second loop.

### Option B — Windows built-in (Xbox Game Bar)
1. Focus the Chrome window.
2. Press **Win + Alt + R** to start recording. Press again to stop.
3. Find the clip in `Videos/Captures`.

### Option C — macOS built-in
1. Press **Shift + Command + 5**.
2. Select **Record Selected Portion**, drag over the Chrome window.
3. Click **Record**. Press **Escape** to stop.

---

## Tips for Best Results

- **Go fullscreen** before recording for the cleanest 16:9 output.
- **Wait 1–2 loops** before cutting so you capture a smooth cycle.
- Use as a **video overlay at 100% opacity**, or use **Luma key / Multiply blend mode** to composite over other footage.
- The animation works best as a **B-roll insert** in your franchise pitch video, for any scene covering the agreement signing step.
