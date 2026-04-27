# bustaTv Development Guide

## Project Overview
bustaTv is a web streaming platform similar to miralalo.com, built for educational purposes to understand streaming aggregation architecture.

## Key Technologies
- **Frontend**: HTML5, CSS3, JavaScript + Clappr player
- **Backend**: Node.js / Python (to be determined)
- **Scraping**: Firecrawl, Playwright
- **Video Player**: Clappr (HLS/DASH support)

## Architecture Insights
Based on miralotv.com analysis:
- Simple HTML structure (~73KB)
- No heavy framework (React/Vue) detected
- Uses Clappr player for video playback
- Streams sourced from external APIs

## Development Principles
- Keep frontend simple and lightweight
- Use open-source video player (Clappr)
- Modular backend architecture
- API-first approach for stream management

## Project Structure
```
bustaTv/
├── frontend/          # UI components, HTML, CSS, JS
├── backend/           # API server and stream management
├── docs/              # Documentation
└── scripts/           # Utility scripts
```

## Next Steps
1. Design database schema for streams
2. Create backend API endpoints
3. Build responsive frontend UI
4. Integrate video player
5. Implement stream discovery

## Legal Notice
This project is for educational purposes only.
