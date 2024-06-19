# Zero Deductible Health Insurance

## Project Overview

This project is a static website that allows users to request pricing information for health insurance plans. It includes a form for users to submit their details, which is then handled by a serverless function hosted on Vercel. The data is stored in a PostgreSQL database.

## Features

- Pricing Request Form: Users can fill out a form to request pricing information.
- Toast Notifications: Displays success and error messages upon form submission.

## Setup

1. Install Dependencies:

    ```sh
    npm install
    ```

2. Run Locally:

    ```sh
    vercel dev
    ```

3. Deploy to Vercel:

    ```sh
    vercel --prod
    ```

## Environment Variables

Make sure to set the `DATABASE_URL` environment variable in Vercel for PostgreSQL connection.
