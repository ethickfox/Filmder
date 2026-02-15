# MovieMatch - Find Films Together 🎬

A fun movie/show matching app for two people to swipe through and find what they both like!

## Quick Start (Browser Only)

The simplest way to run the app - no build tools needed:

```bash
# On macOS
open standalone-index.html

# On Linux
firefox standalone-index.html

# Or drag and drop standalone-index.html into your browser
```

This version uses:
- React via CDN (no build step needed)
- Babel for JSX transpilation
- Tailwind CSS via CDN
- Lucide React icons

**Pros:** No setup, works immediately, single file
**Cons:** No hot reload, relies on CDN availability

## Development Setup (with npm & Vite)

For a more robust development experience with hot module reloading and faster builds:

### Prerequisites
- Node.js 16+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Pros:** Hot reload, faster builds, better DX, production-optimized
**Cons:** Requires Node.js and npm

## Features

- **Two-user swiping**: User 1 and User 2 take turns swiping through shows
- **Match detection**: See which shows you BOTH liked
- **TVMaze API**: Fetches real TV show data (no hardcoded data)
- **Beautiful UI**: Gradient backgrounds and smooth animations
- **Responsive design**: Works on desktop and mobile

## File Structure

```
movie-matcher/
├── standalone-index.html   # Browser-only version (CDN-based)
├── index.html              # Vite entry point (for npm setup)
├── package.json            # NPM dependencies
├── vite.config.js         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── src/
│   ├── main.jsx           # React entry point (npm only)
│   ├── App.jsx            # Main MovieMatcher component
│   └── index.css          # Global styles with Tailwind
├── movie-matcher.jsx      # Standalone JSX (original)
└── README.md              # This file
```

## How It Works

1. **Load shows**: Fetches TV shows from the free TVMaze API
2. **User 1 swipes**: First person swipes through all shows (❤️ = like, ✖️ = dislike)
3. **User 2 swipes**: Second person does the same
4. **See matches**: Shows which shows you BOTH liked
5. **Start over**: Begin a new session anytime

## API Used

- **TVMaze API**: Free, no authentication required
  - Endpoint: `https://api.tvmaze.com/shows`
  - Data includes: show name, premiere date, genres, summary


### Shows not loading
- Check browser console for errors (F12 or Cmd+Option+I)
- Ensure you have internet connection
- TVMaze API may be rate-limited after many requests

## Future Enhancements

- [ ] Filter by genre
- [ ] Search for specific shows
- [ ] Save match history
- [ ] Share matches via URL
- [ ] Multiple genres per show
- [ ] Real poster images instead of emojis
- [ ] Persistent storage (localStorage)
