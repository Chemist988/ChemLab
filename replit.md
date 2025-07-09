# ChemLab - Interactive Chemistry Learning Platform

## Overview

ChemLab is a full-stack web application that provides an interactive chemistry learning experience. It features an interactive periodic table with drag-and-drop functionality, chemical reaction simulations, AI-powered chemistry assistance, and educational tools. The application is built with a modern React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.
Animation preferences: Minimal and realistic reaction animations instead of "cringey" explosive effects.

## Recent Changes

- **January 9, 2025**: Successfully migrated project from Lovable to Replit
  - Fixed dependency issues (react-router-dom, sonner, react-dnd, react-dnd-html5-backend)
  - Migrated routing from react-router-dom to wouter for Replit compatibility
  - Updated all navigation components and CSS font configuration
  - Updated reaction animations to be more minimal and realistic
  - Added new Acid-Base Reaction Lab feature with interactive pH testing
  - Application running successfully on port 5000 with hot reload

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router for client-side navigation
- **Drag & Drop**: react-dnd for interactive element manipulation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with `/api` prefix
- **Development**: Hot reload with Vite middleware integration
- **Error Handling**: Centralized error middleware

### Data Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server
- **Storage Interface**: Abstracted storage layer with in-memory fallback

## Key Components

### Interactive Periodic Table
- Drag-and-drop functionality for chemical elements
- Category-based filtering and highlighting
- Search functionality across element properties
- Responsive design with multiple element card sizes

### Reaction Simulation System
- Real-time chemical reaction animations
- Comprehensive reaction database covering element combinations
- Visual effects for different reaction types (explosions, gas formation, crystallization)
- Reaction logging and history tracking

### AI Chemistry Assistant (TheBlueMatterAI)
- Integrated chatbot for chemistry education
- Breaking Bad themed interface design
- External chatbot service integration via iframe

### UI Component System
- shadcn/ui components with clean dark theme
- Custom chemistry-themed color schemes for element categories
- Consistent spacing and typography using CSS custom properties
- Responsive design patterns

## Data Flow

1. **Element Data**: Static element data imported from local data files
2. **User Interactions**: React components handle user input and state changes
3. **API Communication**: React Query manages server communication and caching
4. **Database Operations**: Drizzle ORM handles type-safe database queries
5. **Real-time Updates**: State updates trigger re-renders across components

## External Dependencies

### Core Dependencies
- **UI Framework**: React, React DOM, React Router
- **Styling**: Tailwind CSS, Radix UI primitives
- **Database**: Drizzle ORM, Neon Database serverless driver
- **State Management**: TanStack Query
- **Development**: Vite, TypeScript, PostCSS

### Chemistry-Specific Features
- Custom reaction simulation engine
- Element property database
- Educational content integration

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- Express server with middleware integration
- Environment-based configuration
- Replit-specific development tools integration

### Production Build
- Vite production build with code splitting
- Express server serving static assets
- Environment variable configuration for database
- Optimized bundle sizes and asset compression

### Database Management
- Drizzle migrations for schema changes
- Environment-based database URL configuration
- Connection pooling for production deployment

The application follows a monorepo structure with shared TypeScript definitions, enabling type safety across the full stack while maintaining clear separation between frontend and backend concerns.