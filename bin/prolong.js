#!/usr/bin/env node

const prolongParking = require('../prolongParking');

const MINUTE = 1000 * 60;
const intervalMinutes = parseInt(process.argv[2]);

if (intervalMinutes && typeof intervalMinutes === "number") {
    setInterval(prolongParking, MINUTE * intervalMinutes);
    console.log(`Extend parking every ${intervalMinutes} minutes..`);
    prolongParking();
} else {
    console.log("Usage: parking <interval_minutes>");
}

