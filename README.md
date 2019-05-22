# doctor-patients

Doctor-Patients project for Tempus
<br>

## Index
+ [Architecture](#architecture)
+ [Installation](#installation)
+ [Future](#future)
<br>

## Architecture<a name="architecture"></a>

The project is split into two parts:

1. Server (localhost:5000)
2. Client-App (localhost:3000)

```
doctor-patients
│ 
├── app                     (react app)
│   └── package.json
│   └── build
│   └── node_modules
│   └── public
│   └── src
│       └── actions
│       └── components
│       └── constants
│       └── reducers
│       └── style
│       └── utilities
│       └── index.js
│
├── package.json
└── index.js               (node server)

```

**Server**

MongoDB was used for the database, mostly because it was quicker for me to implement. 

In a dev environment, the app (localhost:3000) proxies any requests under `/api` to the server (localhost:5000).

The server is set up to handle requests as so:

1. Route
2. Controller
3. Service
4. Model

There are 3 collections, set-up in a relational manner:

- Users
- Doctors
- Patients

A user can be either a doctor or a patient. The `user.username` is a unique constraint.

The login is handled using a JWT strategy with Passport, stored in local storage (in persisted Redux state). 

Custom middleware was created to allow for simple addition of required authentication to routes, prior to controllers:

- `isOwner`
- `isDoctor`
- `isDoctorOrOwner`

The REST API endpoints are as follows:

Method | Path | Description | Security
--- | --- | --- | ---
`POST` | `/api/users/login` | Login | Doc OR Patient
`GET` | `/api/patients` | Get all patients | Doc
`GET` | `/api/patients/:username` | Get patient by username | Doc OR Owner
`PATCH` | `/api/patients/:userId` | Update patient data | Owner


**Client-App**

The client app is a React-Redux application. 

The main pages are:

- Login
- Patient
- Patients

The authenticated user data (Redux state: `auth`) is persisted to local storage. In case of a refresh, the user will still be logged-in.

Path protection and routing is handled by two HOCs:

- `/app/src/components/require_auth`
- `/app/src/components/require_no_auth`

Upon a change in authentication, the appropriate routing is engaged. So executing the login page whilst logged-in already, will take you to the appropriate profile page.

Thunks and Axios are used for all requests. API-middleware for Axios runs on every request to instantiate the UI-loader animation and handle certain error responses as well. A `401` error will automatically log-out the user. 

To be efficient, there is a single Patient page, `/patient/:username`, which renders differently for doctors vs. patients. 

## Installation<a name="installation"></a>

To install and run the project:

1. Run MongoDB: `mongod`
2. Install server and app dependencies: `npm i` && `cd app` `npm i`
3. In the root, run: `npm run setup`
4. In the root, run: `npm run dev`

Now navigate to `localhost:3000` to use the app.

Project was built with MongoDB version 3.6.


## Future<a name="future"></a>

In the spirit of speed, there were many things that would need to be done prior to production.

Just some of those include:

Server:

- Domain Support, https, etc.
- SQL instead of No-SQL
- Server-side validation, error-handling
- Versioned API Endpoints
- More powerful and much more efficient search
- Tests
- More security around token/storage/sessions
- and much more

Client:

- Separate patient data components for doctors/patients.
- Proptypes
- Tests
- Better and more robust error handling
- Better and more robust validation
- and much more
