# Animations

Premium animated motion graphics for the Franchise Agreement video series.

---

## Files

| File | Description |
|------|-------------|
| `scene1-agreement-signing.html` | Franchise Agreement Signing Scene (timestamp 1:59–2:03) |

---

## Scene 1 – Franchise Agreement Signing

### What it shows
A **5–7 second looping** premium corporate animation featuring:

1. **Ambient light rays** — soft gold rays radiating from behind the document area.
2. **Document slide-in** — a glass-morphism styled franchise agreement document slides smoothly into frame from below.
3. **Signing animation** — a stylised hand/pen silhouette draws a smooth gold ink-trail signature onto the document's signature line.
4. **Golden checkmark** — once the signature completes, a glowing golden ✓ appears inside a circle with a particle burst effect.
5. **Typewriter text** — *"Step 1: Sign the Franchise Agreement"* types itself onto the screen character by character.
6. **Loop** — the entire sequence fades out and automatically restarts.

### Color Palette
| Color | Hex |
|-------|-----|
| Deep Navy Blue | `#0a1628` |
| Navy Blue Light | `#1a2d4a` |
| Royal Gold | `#d4af37` |
| White | `#ffffff` |

---

## How to Open

Simply open the HTML file in any modern web browser:

```bash
# macOS
open animations/scene1-agreement-signing.html

# Windows
start animations/scene1-agreement-signing.html

# Linux
xdg-open animations/scene1-agreement-signing.html
```

The animation scales automatically to fit the browser window while preserving the **16:9 aspect ratio**.

---

## How to Screen-Record / Export to Video

### Option A — OBS Studio (recommended, free)
1. Open OBS Studio → **Sources** → `+` → **Window Capture** → select the browser window.
2. Set canvas to **1920×1080** (*Settings → Video*).
3. Click **Start Recording**, let the animation loop 1–2 times, then stop.
4. The output `.mkv`/`.mp4` file is ready to import into your video editor.

### Option B — Browser DevTools (Chrome/Edge)
1. Open the file in Chrome.
2. Press `F12` → **Console** → paste and run the following snippet:
   ```js
   // Records the page for 8 seconds, then auto-downloads a .webm file
   const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
   const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
   const chunks = [];
   recorder.ondataavailable = e => chunks.push(e.data);
   recorder.onstop = () => {
     const blob = new Blob(chunks, { type: 'video/webm' });
     const a = document.createElement('a');
     a.href = URL.createObjectURL(blob);
     a.download = 'scene1-agreement-signing.webm';
     a.click();
   };
   recorder.start();
   setTimeout(() => { recorder.stop(); stream.getTracks().forEach(t => t.stop()); }, 8000);
   ```
   When prompted, select the browser tab showing the animation. Recording stops automatically after 8 seconds.

### Option C — Lottie / JSON export
If you need a Lottie-compatible JSON, re-implement the keyframes in [LottieFiles Creator](https://lottiefiles.com/editor) using the same color palette and timing.

---

## Technical Notes

- **No external dependencies** except Google Fonts (Poppins) loaded via CDN.
- Works offline if Google Fonts are cached or if you substitute a local fallback font.
- The animation uses **CSS keyframes + Canvas 2D API + requestAnimationFrame** for smooth 60 fps rendering.
- The stage is **1920×1080 px** internally and scales via CSS `transform: scale()` to fit any viewport.
