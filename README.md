# Rick and Morty Characters

A React Router application for browsing Rick and Morty characters. The app fetches data from the public Rick and Morty GraphQL API and provides a character list view plus a detailed profile view for each character.

## Features

- Browse a table of characters from the Rick and Morty API
- Open individual character profiles with rich details
- Navigate between the home page and profile pages with React Router
- Display loading and error states for GraphQL requests
- Built with TypeScript, Apollo Client, Tailwind CSS, and Vite

## Tech Stack

- React 19
- React Router 8
- Apollo Client for GraphQL
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by the dev server in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the app for production
- `npm run start` — run the production build
- `npm run typecheck` — run TypeScript checks and route type generation

## Project Structure

- `app/routes` — route components for the home and profile pages
- `app/components` — UI components such as the character table and profile view
- `app/graphql` — Apollo queries and client setup
- `app/types` — TypeScript types for GraphQL data

## Notes

The app uses the public GraphQL endpoint:

- https://rickandmortyapi.com/graphql
