# Architecture

## Overview

Three repos:

- `studland-data` - GitHub repo to store data as JSON/CSV files
- `Studland.Services` - Multiple AWS Lambdas (C#). Update the data.
- `studland-pwa` - Next.js app, deployed to Vercel. Reads the data.

## `studland-pwa` architecture

- Next.js app, which pulls the data from the `studland-data` repo (just a simple
  HTTP request).
- Uses SWR to cache the data, so that when you're on the Studland Site and have
  bad internet you can still see recent data (e.g. tide predictions don't
  change).
- Designed using Tailwind
- Supports the notches on iOS!
- Popup box if app is not installed as a PWA (see
  <https://thomashunter.name/posts/2021-12-11-detecting-if-pwa-twa-is-installed>)

## UI design

Bottom-tabbed interface:

- Weather (inc sunrise/sunset)
- Tides (just all fetched predictions)
- Map (v similar to now)
- Calendar (vertical)
- More info (similar to current page)

The site for 2023 had a home page and the concept of daily data. But this new
design will feel more like a rolling stream of data. The user often wants to
know the category of data, rather than the date on which the data applies (e.g.
in order to see tide data you want to click on "Tides" rather than today's
date).
