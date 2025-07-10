# Replit.md - ChemLab Interactive Chemistry Application

## Overview

ChemLab is a full-stack chemistry education application built with modern web technologies. The application features an interactive periodic table, chemical reaction simulator, and an AI chatbot for chemistry assistance. It's designed as an educational tool with Breaking Bad-inspired theming to make chemistry engaging and accessible.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router for client-side navigation
- **State Management**: React hooks and React Query for server state
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom dark theme and Breaking Bad-inspired design
- **Build Tool**: Vite for fast development and optimized builds
- **Drag & Drop**: React DnD for interactive element manipulation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the stack
- **Development**: Development server with hot module replacement
- **Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: PostgreSQL session store configuration ready

### Database Strategy
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Current State**: In-memory storage with database-ready architecture

## Key Components

### Frontend Components
1. **PeriodicTable**: Interactive periodic table with element selection, filtering, and category highlighting
2. **ReactionZone**: Drag-and-drop area for simulating chemical reactions with visual effects
3. **ElementCard**: Reusable element display component with drag functionality
4. **ElementDetail**: Modal displaying comprehensive element information
5. **ChemistryAIChat**: Integrated chatbot with slang translation and chemistry assistance
6. **ElementSuggestions**: Context-aware suggestions for chemical compounds and reactions
7. **TopNav**: Breaking Bad-themed navigation with glass morphism effects

### Backend Components
1. **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
2. **Route System**: Express.js route registration with organized structure
3. **Vite Integration**: Development server integration with HMR support

### Utility Systems
1. **Reaction Simulation**: Comprehensive chemical reaction database with visual animations
2. **Element Database**: Complete periodic table data with properties and descriptions
3. **Theme System**: Dark-only theme with Breaking Bad color palette
4. **Animation System**: CSS animations for chemical reaction visual effects

## Data Flow

### Element Interaction Flow
1. User interacts with periodic table or searches for elements
2. Element selection triggers detail modal with comprehensive information
3. Drag and drop enables element combination in reaction zone
4. Reaction simulation provides educational feedback with animations

### Reaction Simulation Flow
1. Elements are dropped into reaction zone
2. Reaction utility checks for valid chemical combinations
3. Results display with appropriate animations and educational descriptions
4. Reaction history is stored in localStorage for activity tracking

### AI Chat Integration
1. User queries are processed through embedded chatbot iframe
2. Slang translation system converts informal language to formal chemistry terms
3. Context-aware responses provide educational chemistry assistance

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver (ready for future use)
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **react-dnd**: Drag and drop functionality for element interactions
- **date-fns**: Date formatting and manipulation utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette functionality

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type safety throughout the application
- **tsx**: TypeScript execution for server development

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Assets**: Client build output served by Express in production

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Express serves built client and API routes
- **Database**: PostgreSQL connection ready via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build both client and server for production
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes

### Replit Integration
- **Cartographer Plugin**: Development environment integration
- **Runtime Error Modal**: Enhanced error display in development
- **Environment Detection**: Automatic Replit-specific configuration

The application is designed to be educational, engaging, and technically robust, with a clear separation of concerns and room for future enhancements like user authentication, persistent data storage, and expanded chemistry content.