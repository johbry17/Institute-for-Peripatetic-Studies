# Institute for Peripatetic Studies

*Collegium Itinerantium — Solvitur Ambulando*

The Institute for Peripatetic Studies advances Peripatetics — the interdisciplinary study of place through movement, combining geography, ecology, history, culture, observation, cartography, and conversation to understand landscapes as living systems.

---

## Project Overview

A small static website and collection of formal institutional documents for the Institute for Peripatetic Studies, a deliberately fictional academic institution devoted to wandering, observation, and place-based inquiry.

### Website Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Institutional introduction, mission, director's welcome |
| About | `about.html` | Founding story, philosophy, research methods |
| Academic Affairs | `academic-affairs.html` | D.P.S. and L.P.S. degrees, charter download |
| Diploma Generator | `diploma-generator.html` | L.P.S. diploma + letter generator |

### Repository Artifacts (not linked publicly)

| Document | File | Description |
|----------|------|-------------|
| Founding Charter | `documents/charter.html` | Printable founding charter |
| D.P.S. Diploma | `documents/dps-diploma.html` | Personalized diploma for Bryan Johns |
| D.P.S. Instrument of Conferral | `documents/dps-conferral.html` | Formal conferral record for Bryan Johns |

---

## Local Development

This is a plain static site — no build step, no package manager, no server required.

```bash
# Clone the repository
git clone https://github.com/johbry17/Institute-for-Peripatetic-Studies.git
cd Institute-for-Peripatetic-Studies

# Open in a browser directly, or serve locally:
# Python 3
python -m http.server 8080
# Then open http://localhost:8080
```

All pages rely on [Google Fonts](https://fonts.google.com/) (Cinzel, EB Garamond, Great Vibes) loaded via CDN. An active internet connection is required for fonts to render correctly.

---

## Deployment

The site is designed for GitHub Pages deployment from the repository root.

1. Push to the `main` branch.
2. In **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/` (root).
3. The site will be available at `https://johbry17.github.io/Institute-for-Peripatetic-Studies/`.

No build pipeline or configuration files are required.

---

## Generating PDFs

All printable documents include a **Print / Save as PDF** button. To generate PDFs:

1. Open the document in a Chromium-based browser (Chrome or Edge recommended).
2. Click the **Print / Save as PDF** button, or use **File → Print**.
3. In the print dialog, choose **Save as PDF** as the destination.
4. Click **Save**.

Page orientations are set automatically:
- **Diploma** (`dps-diploma.html`, generator diploma): landscape US Letter
- **Charter** (`charter.html`), **Instrument of Conferral** (`dps-conferral.html`), **generator letter**: portrait US Letter

The diploma generator's **Print Both Documents** button produces a two-page print job: diploma (landscape) followed by letter of conferral (portrait).

---

## Project Structure

```
.
├── index.html                   # Home
├── about.html                   # About the Institute
├── academic-affairs.html        # Academic Affairs
├── diploma-generator.html       # L.P.S. Diploma Generator
├── assets/
│   ├── css/main.css             # Shared stylesheet
│   └── js/generator.js          # Diploma generator logic
├── documents/
│   ├── charter.html             # Founding charter
│   ├── dps-diploma.html         # D.P.S. diploma (Bryan Johns)
│   └── dps-conferral.html       # D.P.S. instrument of conferral
└── resources/
    └── images/                  # Brand assets (seal, wordmark, favicon, etc.)
```

---

## Visual Identity

| Token | Value |
|-------|-------|
| Forest Green | `#1f3b2e` |
| Antique Gold | `#b89b5a` |
| Charcoal | `#2f2f2f` |
| Ivory / Parchment | `#f2f4e9` |
| Display font | Cinzel / Cinzel Decorative |
| Body font | EB Garamond |
| Signature font | Great Vibes |

---

*An independent creative project. All distinctions conferred by the Institute are self-created, self-conferred, and entirely non-accredited.*
