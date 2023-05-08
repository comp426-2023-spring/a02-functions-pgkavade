#!/usr/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));

if (args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("    -h            Show this help message and exit.");
    console.log("    -n, -s        Latitude: N positive; S negative.");
    console.log("    -e, -w        Longitude: E positive; W negative.");
    console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("    -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);
}

const lat = args.n || args.s * -1;
const long = args.e || args.w * -1;
const timezone = moment.tz.guess();

const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&daily=precipitation_hours&current_weather=true&timezone=" + timezone);

const data = await response.json();

if (arg.j) {
    console.log(data);
    process.exit(0);
}

const days = args.d;

const string = days == 0 ? "today." : days > 1 ? "in " + days + " days." : "tomorrow.";

if (data.daily.precipitation_hours[days] > 0) {
    console.log("It will not rain.");
} else {
    console.log("It will rain.");
}