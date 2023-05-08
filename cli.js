#!/usr/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));

if (args.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit`);
	process.exit(0);
}

const timezone = moment.tz.guess();

const latitude = args.n || (args.s * -1);
const longitude = args.e || (args.w * -1);

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&temperature_unit=fahrenheit&timezone=' + timezone);
const data = await response.json();

if (args.j) {
    console.log(data);
    process.exit(0);
}

const day = args.d

if (data.daily.precipitation_hours[day] == 0) {
    console.log("You will not need your galoshes.");
} else {
    console.log("You might need your galoshes.");
}

if (day == 0) {
  console.log("today.")
} else if (day > 1) {
  console.log("in " + day + " days.")
} else {
  console.log("tomorrow.")
}
