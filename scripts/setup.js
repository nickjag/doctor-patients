const path = require('path');
const fs = require('fs');

// quick setup to create .env files from .env.sample

const fakeSecret = `TOKEN_SECRET='${Math.floor(Math.random() * 1000)}'`;

const envSample = path.resolve('./.env.sample');
const envSampleReact = path.resolve('./app/.env.sample');

let envFile = fs.readFileSync(envSample, 'utf8');
const envFileReact = fs.readFileSync(envSampleReact, 'utf8');

envFile = envFile.replace("TOKEN_SECRET=''", fakeSecret);

const envPath = path.resolve('./.env');
const envPathReact = path.resolve('./app/.env');

fs.writeFileSync(envPath, envFile, 'utf8');
fs.writeFileSync(envPathReact, envFileReact, 'utf8');
