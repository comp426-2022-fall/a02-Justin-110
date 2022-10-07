#!/usr/bin/env node
// Dependencies
import minimist from 'minimist';
import moment from 'moment-timezone';
//Load Fetch
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));
console.log(args)

//Default action
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE

    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)

// declare latitude
let latitude = '35.875'
if (args.n) {
    latitude = args.n
}

if (args.s) {
    latitude = args.s
}

// declare longitude
let longitude = '-79.0'
if (args.e) {
    longitude = args.e
}

if (args.w) {
    longitude = args.w
}

// declare timezone
if (args.t) {
  timezone = args.t
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m&current_weather=true&timezone=' + timezone);
// Get the data from the request
const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
} 
  
const days = args.d 
  
if (days == 0) {
      console.log("today.")
    } else if (days > 1) {
      console.log("in " + days + " days.")
    } else {
      console.log("tomorrow.")
}

