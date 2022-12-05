#  Overview

This project hosts a simple frontend and backend to surface data from the following [spreadsheet](https://docs.google.com/spreadsheets/d/14bEe8qFkJptV0stpkIrkBw3GCADte6XuZv9jXpRllWg/edit?usp=sharing).

# Running locally:

## Native
- Install a recent version of Node
- Add a Google API key with access to GSheets to your env variables: `export GOOGLE_SHEETS_API_KEY=<your_key>`
- `npm install`
- `npm start`
- Navigate to `localhost:8081` in your web browser

## Docker Compose
- Create an `.env` file with `GOOGLE_SHEETS_API_KEY=<your_key>` in the root directory of this project.
- Run `docker compose up`
- Navigate to `localhost:8081` in your web browser

# Future improvements
- Frontend
- - Improve error handling to give users an alert or message with details
- - Add more advanced filtering to front-end with multi-selects and add support to carrier API
- - Transpile code instead of using standalone React/Babel
- - Split out frontend into separate components and files
- Backend
- - Handle larger data by writing files to disk and chunking
- - Cache normalized carrier data in a SQLite DB and query from it rather than scraping all of GSheets on every request and filtering in memory
- - Add unit/integration/E2E tests
- - Add linting