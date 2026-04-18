# Portfolio Website

A modern, animated portfolio website built with:

- React
- TypeScript
- Vite
- Framer Motion
- Lucide React

## Folder structure

```bash
portfolio-website/
├─ public/
│  ├─ profile.jpg        # replace with your photo
│  └─ resume.pdf         # replace with your resume PDF
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ SectionHeading.tsx
│  │  ├─ SkillCard.tsx
│  │  └─ ProjectCard.tsx
│  ├─ data/
│  │  └─ portfolioData.ts
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to GitHub.
2. Go to Vercel.
3. Import the GitHub repository.
4. Build command: `npm run build`
5. Output directory: `dist`

## Deploy to Netlify

1. Push this project to GitHub.
2. Import the repository in Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Replace placeholders

- Put your own photo at `public/profile.jpg`
- Put your own resume at `public/resume.pdf`
- Edit your name, bio, skills, links, phone, and projects in `src/data/portfolioData.ts`
