# E-Summit 2026 - Tech Event Website

## Overview

This is a full-stack web application for **E-Summit 2026**, a futuristic tech conference/event website. It features a cinematic 3D hero section with a space theme, event scheduling, speaker profiles, and attendee registration. The app uses a React frontend with Three.js 3D graphics, an Express backend API, and PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **UI Components**: Shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **3D Graphics**: React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`) + Three.js for the space-themed hero section with particle effects and floating astronaut
- **Animations**: Framer Motion for page transitions and UI animations
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod resolver for validation
- **Styling**: Tailwind CSS with CSS variables for theming (dark space/neon theme). Custom fonts: Architects Daughter (display), DM Sans (body), Fira Code (mono)

**Pages:**
- `/` - Home with 3D hero section, event previews, and feature highlights
- `/events` - Event schedule listing (fetched from API)
- `/speakers` - Speaker profiles (currently static/mock data)
- `/register` - Registration form (submits to API)

### Backend (server/)
- **Framework**: Express.js on Node with TypeScript
- **Runtime**: tsx for development, esbuild for production builds
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between client and server (via `shared/` directory)
- **Session Store**: connect-pg-simple (PostgreSQL-backed sessions)

### Shared Code (shared/)
- `schema.ts` - Drizzle table definitions and Zod insert schemas for `registrations` and `events` tables
- `routes.ts` - API route contracts (paths, methods, input/output schemas) shared between frontend and backend

### Database Schema
- **registrations**: id (serial), name (text), email (text), company (text, nullable), createdAt (timestamp)
- **events**: id (serial), title (text), description (text), time (text), location (text), speaker (text, nullable)

Database is managed via `drizzle-kit push` (no migration files needed for dev). The database seeds sample events on server startup if none exist.

### API Endpoints
- `POST /api/registrations` - Create a new registration
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get a single event by ID

### Build System
- **Development**: Vite dev server proxied through Express (server/vite.ts handles HMR)
- **Production**: Client built with Vite to `dist/public/`, server bundled with esbuild to `dist/index.cjs`
- **Scripts**: `npm run dev` (development), `npm run build` (production build), `npm run db:push` (sync schema to DB)

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Connection via `DATABASE_URL` environment variable. Used for storing events and registrations. Drizzle ORM connects through `node-postgres` (pg) Pool.

### Key npm Packages
- **@react-three/fiber** + **@react-three/drei** + **three** - 3D rendering in React
- **framer-motion** - Animation library
- **maath** - Math utilities for 3D particle generation
- **drizzle-orm** + **drizzle-zod** + **drizzle-kit** - Database ORM and schema tooling
- **@tanstack/react-query** - Async state management
- **wouter** - Client-side routing
- **zod** - Runtime validation (shared between client/server)
- **react-hook-form** + **@hookform/resolvers** - Form management
- **shadcn/ui** components (Radix UI + Tailwind CSS based)
- **lucide-react** - Icon library

### External Assets
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono
- Unsplash images for speaker profile photos (referenced by URL in Speakers page)