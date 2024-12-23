# GoogleMapsPathFinder

## Background

This project was originally developed as part of a diploma defense at Belarusian State University (BSU) in Minsk, Belarus, in 2018. It represents the practical component of my academic research and efforts in the field of logistics and transportation.

The codebase is now made public to serve as a resource and tool for others interested in freight route optimization. Please note that this repository contains only the code and not the accompanying thesis text or its descriptive components.

## Overview

GoogleMapsPathFinder is a web-based application designed to streamline the process of planning and optimizing freight transportation routes. Utilizing the Google Maps API, it allows users to input multiple dispatch and destination points, calculates the most efficient routes, and offers route customization based on user preferences.

## Features

- Input for start and end points of the transportation route.
- Ability to add multiple intermediate waypoints.
- Route optimization options, including avoidance of toll roads and the selection of alternative paths.
- Display of additional places of interest near the planned route, such as gas stations and service stations.
- Multilingual support with auto-detection for English, Russian, and Belarusian languages.

## Getting Started

To get started with GoogleMapsPathFinder, clone the repository to your local machine and follow the instructions to set up the dependencies.

```bash
git clone https://github.com/EugeneBachura/GoogleMapsPathFinder.git
cd GoogleMapsPathFinder
# Instructions to install dependencies and running the application
```

## Configuration

Before using GoogleMapsPathFinder, you need to configure it with your own Google Maps API key. Follow these steps to set it up:

1. Visit [Google Cloud Platform](https://cloud.google.com/maps-platform/) and log in or sign up if you haven't already.
2. Navigate to the Google Maps Platform section and click on the 'Get Started' button.
3. Follow the on-screen prompts to create a new project and enable the Google Maps JavaScript API, and any other APIs that you plan to use (Places API, for instance).
4. Once the API is enabled, create an API key by navigating to the 'Credentials' tab.
5. Restrict the API key to your domain to prevent unauthorized usage and charges.
6. Copy the API key provided by Google.

With the key in hand, you will need to insert it into the main HTML file that initializes the Google Maps script.

Look for the line similar to this in your language-specific HTML files:

```html
<script
  src="https://maps.googleapis.com/maps/api/js?onload=onLoadCallback?key=YOUR_API_KEY&libraries=places&language=en&callback=initMap"
  async
  defer
></script>
```
