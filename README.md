# duel

Lightweight mock backend + React frontend demo that processes a set of mixed JSON user files, seeds an in-memory MongoDB, and serves clean/dirty user collections to a Vite + React UI.

## Quickstart

1. Full stack (recommended)
   - Make executable and run:
     ```bash
     chmod +x run.sh
     ./run.sh
     ```
   - [run.sh](http://_vscodecontentref_/0) will:
     - install deps for backend and frontend if needed
     - run [processData.ts](http://_vscodecontentref_/1) to generate [data/clean_data.json](http://_vscodecontentref_/2) and [data/dirty_data.json](http://_vscodecontentref_/3) if missing
     - start the backend (runs [npm run start](http://_vscodecontentref_/4) in [package.json](http://_vscodecontentref_/5), which builds via `tsc` and runs the compiled code)
     - start the frontend (runs Vite dev server from frontend/package.json)

2. Run backend only
   - cd into backend:
     ```bash
     cd backend
     npm install
     npm run start
     ```
   - The Express server is configured in [app.ts](http://_vscodecontentref_/6) and exposes the routes implemented in [user.ts](http://_vscodecontentref_/7). The database connection and seeding are handled by [connectDB](http://_vscodecontentref_/8).

3. Run frontend only
   - cd into frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Frontend entry is [main.tsx](http://_vscodecontentref_/9). It dispatches [fetchUsers](http://_vscodecontentref_/10) which uses [userService.ts](http://_vscodecontentref_/11) to call the backend API at `http://localhost:3000/user`.

## API

- GET /user/clean — returns clean users (see backend/routes/user.ts)
- GET /user/clean/:id — single clean user by Mongo id
- GET /user/dirty — returns dirty/invalid users
- GET /user/dirty/:id — single dirty user by Mongo id

The Mongoose models and seed logic are in [user.ts](http://_vscodecontentref_/12) ([CleanUser](http://_vscodecontentref_/13), [DirtyUser](http://_vscodecontentref_/14)).

## Data processing

- [processData.ts](http://_vscodecontentref_/15) walks the files in [mixed](http://_vscodecontentref_/16), attempts to parse each JSON file via [tryParse](http://_vscodecontentref_/17)/[parseRaw](http://_vscodecontentref_/18), and categorizes each file into clean or dirty lists. It writes output JSON to [data/clean_data.json](http://_vscodecontentref_/19) and [data/dirty_data.json](http://_vscodecontentref_/20) which are then used by the backend seeding functions ([seedCleanUsers](http://_vscodecontentref_/21), [seedDirtyUsers](http://_vscodecontentref_/22)) in [user.ts](http://_vscodecontentref_/23).

- Input shape is described in [types.ts](http://_vscodecontentref_/24) and [user.ts](http://_vscodecontentref_/25).

## Development notes

- Backend uses an in-memory MongoDB ([mongodb-memory-server]) started in [connectDB](http://_vscodecontentref_/26). This makes the backend ephemeral and good for local demos.
- Frontend uses Redux Toolkit; main slice is [userSlice.ts](http://_vscodecontentref_/27) and async thunks are [userThunks.ts](http://_vscodecontentref_/28).
- If you modify the backend TypeScript, run `npm run build` from the [backend](http://_vscodecontentref_/29) folder (or let [npm run start](http://_vscodecontentref_/30) run it).

## Useful links to code
- [run.sh](http://_vscodecontentref_/31)
- [app.ts](http://_vscodecontentref_/32)
- [connectDB](http://_vscodecontentref_/33) — [database.ts](http://_vscodecontentref_/34)
- [user.ts](http://_vscodecontentref_/35) ([seedCleanUsers](http://_vscodecontentref_/36), [seedDirtyUsers](http://_vscodecontentref_/37))
- [user.ts](http://_vscodecontentref_/38)
- [processData.ts](http://_vscodecontentref_/39)
- [types.ts](http://_vscodecontentref_/40)
- [main.tsx](http://_vscodecontentref_/41)
- [App.tsx](http://_vscodecontentref_/42)
- [userService.ts](http://_vscodecontentref_/43)
- [fetchUsers](http://_vscodecontentref_/44) — [userThunks.ts](http://_vscodecontentref_/45)
- [store.ts](http://_vscodecontentref_/46)
- [userSlice.ts](http://_vscodecontentref_/47)
- UI components:
  - [UserTabs.tsx](http://_vscodecontentref_/48)
  - [CleanUsers.tsx](http://_vscodecontentref_/49)
  - [DirtyUsers.tsx](http://_vscodecontentref_/50)
  - [UserTable.tsx](http://_vscodecontentref_/51)

## Contact / next steps

- To add more robust validation, expand [validateData](http://_vscodecontentref_/52) in [processData.ts](http://_vscodecontentref_/53).
- To persist data beyond memory, replace the in-memory server in [connectDB](http://_vscodecontentref_/54) with a real MongoDB URI.
