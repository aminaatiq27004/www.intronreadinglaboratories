# Intron Reading Labs

> Production platform, research applications suite, and Vercel edge deployment for **[intron-reading-labs.ai.studio](https://intron-reading-labs.ai.studio)** and **[www.intronreadinglabs.com](https://www.intronreadinglabs.com)**.

---

## 🔬 Foundational Research & Applications

**Intron Reading Labs** is centered around the **Ultra Triplet Codon Theory (UTCT)** — establishing that triplet codons encode multi-layered supra-translational signals that govern pre-mRNA splicing kinetics, split-codon junction phase invariance (Phases 0, 1, 2), and ribosomal elongation pause landscapes.

The suite unites 6 integrated research modules:
- **Ultra Triplet Codon Engine (`/apps/ultra-triplet-codon`)** *(Core Work)*: 64-codon harmonic matrix, ESE/ESS resonance profiles, Phase 0/1/2 split-codon invariance inspector, and synthetic splice-switching oligonucleotide (SSO) rescue simulator.
- **SpliceSense Studio (`/apps/splice-sense`)**: Sequence-level validation of Postulate I (Phase Invariance) and Postulate II (ESE Harmonics), canonical 5' donor (`GU`) & 3' acceptor (`AG`) detection, and triple-frame translation.
- **BioLex Literature Reader (`/apps/biolex-reader`)**: Cognitive literature portal featuring the landmark 2026 Nature UTCT publication, 150–900 WPM RSVP with Optimal Recognition Point (ORP) fixation, and hypothesis claim extraction.
- **IsoformMapper (`/apps/isoform-mapper`)**: Multi-transcript alternative splicing modeling, testing UTCT phase symmetry and premature termination decay (PTC) avoidance.
- **Cadence Lab (`/apps/cadence-lab`)**: Cognitive saccade guide demonstrating UTCT Postulate III (the biophysical homology between the 3-token reading quantum and ribosomal 3-nucleotide pacing).
- **BioGraph Explorer (`/apps/biograph-explorer`)**: Interactive ontology of pre-mRNA splicing history (1977–2026) culminating in the UTCT breakthrough.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel & www.intronreadinglabs.com

This repository is optimized for one-click zero-configuration deployment to Vercel:

```bash
# Push to main branch (triggers automatic Vercel build)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/intronreadings.git
git branch -M main
git push -u origin main
```

### Vercel Custom Domain Configuration
- **Production Domain**: `www.intronreadinglabs.com` (CNAME `cname.vercel-dns.com`)
- **Apex Domain**: `intronreadinglabs.com` (A Record `76.76.21.21`)

---

## 📁 Repository Structure

```
├── .env.example              # Environment variables template
├── vercel.json               # Vercel deployment routes and security headers
├── index.html                # App entry point with typography
├── package.json              # Dependencies and build scripts
├── src/
│   ├── App.tsx               # Primary router & view controller
│   ├── main.tsx              # React 19 bootstrap
│   ├── index.css             # Tailwind CSS & lab typography
│   ├── types/                # TypeScript interfaces
│   ├── data/                 # Curated genomic presets & papers
│   ├── components/
│   │   ├── Header.tsx        # Top Bar contract navigation
│   │   ├── HeroSection.tsx   # Visual laboratory hero
│   │   ├── AppCatalog.tsx    # Filterable app suite
│   │   ├── Footer.tsx        # Institutional footer
│   │   ├── apps/
│   │   │   ├── SpliceSenseApp.tsx     # RNA Splicing & ORF Analyzer
│   │   │   ├── BioLexReaderApp.tsx    # RSVP & Bionic Paper Reader
│   │   │   ├── IsoformVisualizerApp.tsx # Alternative Splicing Modeler
│   │   │   ├── ReadingCadenceApp.tsx  # Saccade Pacing Trainer
│   │   │   └── KnowledgeGraphApp.tsx  # Citation Explorer
│   │   └── induction/
│   │       ├── InductionCenter.tsx    # Vercel DNS & GitHub sync console
│   │       └── CodeExportModal.tsx    # File export modal
```

---

## 📄 License

Licensed under the Apache License, Version 2.0.
All research tools open for academic and clinical inquiry at **Intron Reading Labs**.
