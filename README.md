# duel

Lightweight mock backend + React frontend demo that processes a set of mixed JSON user files, seeds an in-memory MongoDB, and serves clean/dirty user collections to a Vite + React UI.

## Quickstart

1. Full stack (recommended)
   - Make executable and run:
     ```bash
     chmod +x run.sh
     ./run.sh
     ```
   - run.sh will:
     - install deps for backend and frontend if needed
     - run processData.ts to generate data/clean_data.json and data/dirty_data.json if missing
     - start the backend (runs `npm run start` in backend/package.json, which builds via `tsc` and runs the compiled code)
     - start the frontend (runs Vite dev server from frontend/package.json)

2. Run backend only
   - cd into backend:
     ```bash
     cd backend
     npm install
     npm run start
     ```
   - The Express server is configured in app.ts and exposes the routes implemented in routes/user.ts. The database connection and seeding are handled by database.ts (connectDB).

3. Run frontend only
   - cd into frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Frontend entry is src/main.tsx. It dispatches fetchUsers which uses src/services/userService.ts to call the backend API at http://localhost:3000/user.

## API

- GET /user/clean — returns clean users
- GET /user/clean/:id — single clean user by Mongo id
- GET /user/dirty — returns dirty/invalid users
- GET /user/dirty/:id — single dirty user by Mongo id

The Mongoose models and seed logic are in backend/schemas/user.ts (CleanUser, DirtyUser).

## Data processing

- backend/scripts/processData.ts walks the files in data/mixed, attempts to parse each JSON file via tryParse/parseRaw, and categorizes each file into clean or dirty lists. It writes output JSON to data/clean_data.json and data/dirty_data.json which are then used by the backend seeding functions (seedCleanUsers, seedDirtyUsers) in backend/schemas/user.ts.

- Input shape is described in backend/scripts/types.ts and frontend/src/types/user.ts.

## Development notes

- Backend uses an in-memory MongoDB (mongodb-memory-server) started in backend/database.ts. This makes the backend ephemeral and good for local demos.
- Frontend uses Redux Toolkit; main slice is frontend/src/store/userSlice.ts and async thunks are frontend/src/store/userThunks.ts.
- If you modify the backend TypeScript, run `npm run build` from the backend folder (or let `npm run start` run it).