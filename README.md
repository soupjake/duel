# Duel

A lightweight mock backend and React frontend demo that processes a set of mixed JSON user files, seeds an in-memory MongoDB, and serves clean/dirty user collections to a Vite + React UI.

## Quickstart

**NOTE:** Ensure the user JSON files are placed in the project root under `data/mixed/` (e.g., `data/mixed/*.json`).

1. **Full stack (recommended)**
   - Make executable and run:
     ```bash
     chmod +x run.sh
     ./run.sh
     ```
   - `run.sh` will:
     - Install dependencies for backend and frontend if needed.
     - Run `processData.ts` to generate `output/clean_data.json` and `output/dirty_data.json` if missing.
     - Run `generateMetrics.ts` to generate `output/metric_data.json` if missing.
     - Start the backend (runs `npm run start` in `backend/package.json`, which builds via `tsc` and runs the compiled code).
     - Start the frontend (runs Vite dev server from `frontend/package.json`).

2. **Run backend only**
   - Change directory into backend:
     ```bash
     cd backend
     npm install
     npm run start
     ```
   - The Express server is configured in `app.ts` and exposes the routes implemented in `routes/user.ts`. The database connection and seeding are handled by `database.ts` (connectDB).

3. **Run frontend only**
   - Change directory into frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Frontend entry is `src/main.tsx`. It dispatches `fetchUsers`, which uses `src/services/userService.ts` to call the backend API at `http://localhost:3000/user`.

## API

- **GET** `/user/clean` — returns clean users
- **GET** `/user/clean/:id` — single clean user by MongoDB ID
- **GET** `/user/dirty` — returns dirty/invalid users
- **GET** `/user/dirty/:id` — single dirty user by MongoDB ID
- **GET** `/user/metrics` — returns user metrics

The Mongoose models and seed logic are in `backend/schemas/user.ts` (CleanUser, DirtyUser) and `backend/schemas/metrics.ts` (UserMetrics).

## Data Processing

- `backend/scripts/processData.ts` walks the files in `data/mixed`, attempts to parse each JSON file via `tryParse/parseRaw`, and categorizes each file into clean or dirty lists. It writes output JSON to `output/clean_data.json` and `output/dirty_data.json`, which are then used by the backend seeding functions (`seedCleanUsers`, `seedDirtyUsers`) in `backend/schemas/user.ts`.
- `backend/scripts/generateMetrics.ts` takes in the result of the `output/clean_data.json` file and generates a summary of which user has the most likes, comments and shares. It writes output JSON to `output/metric_data.json` which is then used by the backend seeding function `seedUserMetrics`, `seedDirtyUsers` in `backend/schemas/metrics.ts`.

- Input shape is described in `backend/scripts/types.ts` and `frontend/src/types/user.ts`.

## Development Notes

- The backend uses an in-memory MongoDB (`mongodb-memory-server`) started in `backend/database.ts`. This makes the backend ephemeral and suitable for local demos.
- The frontend uses React with Redux Toolkit; the main slice is in `frontend/src/store/userSlice.ts` and async thunks are in `frontend/src/store/userThunks.ts`.
- If you modify the backend TypeScript, run `npm run build` from the backend folder (or let `npm run start` run it).