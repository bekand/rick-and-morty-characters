# Rick and Morty Characters (exercise)

A React Router application for browsing Rick and Morty characters. The app fetches data from the public Rick and Morty GraphQL API and provides a character list view plus a detailed profile view for each character.

## Features

- Browse and search a table of characters from the Rick and Morty universe
- Open individual character profiles for more details
- Navigate between the home page and profile pages with React Router
- Display loading and error states for GraphQL requests

## Tech Stack

- React 19
- React Router 8
- Apollo Client for GraphQL
- TypeScript
- Tailwind CSS
- Vite

### Why this stack specifically?

- React and React Router: small SPA with client-side navigation, only two routes and few components. Something like Angular would be an overkill
- GraphQL and Apollo Client: fetching partial data for the table (which the REST API can't do), easy search, pagination, and simple in-memory cache
- TypeScript: helps keep the GraphQL responses and related data objects typed, which makes working with the data easier and safer
- Tailwind: simple and fast styling
- Vite: recommended by React

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
- `npm run test` — run the Vitest test suite

## Project Structure

- `app/routes` — route components for the home and profile pages
- `app/components` — UI components
- `app/graphql` — Apollo queries and client setup
- `app/hooks` — reusable hooks such as debouncing helper
- `app/types` — TypeScript types for GraphQL data and UI models
- `tests` — integration tests

## Notes about the API

API used: https://rickandmortyapi.com/graphql

The API only 300x300 images. This is not ideal for displaying them in a table. Ideally we would have an `srcset` with different size images depending on where and at what size we display them.

The API is also severely rate-limited due to being a public free API, so I added the in-memory caching option, and a small retry logic, to reduce fetching errors.
