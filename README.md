![Depshield Logo](./assets/logo.png)

# Depshield

Depshield is a powerful tool designed to analyze and monitor the security and integrity of your code repositories. Inspired by Debricked, it checks for vulnerabilities, limitations, and dependencies across different branches. Users can scan repositories to retrieve and analyze data, ensuring secure and optimized development.

## Features

Dependency Analysis: Identify and track dependencies within your project.

Vulnerability Scanning: Detect security vulnerabilities and limitations in dependencies.

Branch Monitoring: Scan and retrieve data from repositories efficiently.

Authentication & Security: Uses Auth.js for authentication and Codecy for tracking code errors and duplication.

Comprehensive Testing: Ensures reliability with Jest and Playwright.

## Branching Strategy

Test Branch: Used for internal testing.

Beta Branch: Used for client testing.

Development Branch: Uses the naming convention depshield-client-vX.00.00X, where X changes based on iteration.

## Configuration

The backend URLs and important keys/tokens are stored in the .env file.

After modifying the .env file, export the values from config.ts for proper integration.

.env.example file is provided to illustrate the .env file structure

## Technologies Used

Framework: Next.js

Forms & Validation: React Hook Form, Zod

UI Components: Shadcn

Networking: Axios

State Management: TanStack Query

Icons: Lucide Icons

Authentication: Auth.js

Testing: Jest, Playwright

Code Quality Monitoring: Codecy

## Getting Started

First, install dependencies:

npm install

Run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 in your browser to view the application.

## Deployment

The recommended deployment platform is Vercel. Refer to the Next.js Deployment Guide for more details.

Deploying with Vercel CLI

To deploy your project using Vercel CLI, follow these steps:

Install Vercel CLI if you haven’t already:

npm install -g vercel

Login to Vercel:

vercel login

Follow the prompts to authenticate with your Vercel account.

Navigate to your project directory and deploy:

vercel

This will initialize the deployment process and prompt you with options.

If deploying updates, use:

vercel --prod

Deploying to Development and Preview Environments

Development Environment: To deploy your project in a development environment, use:

vercel --env development

This helps in testing changes before pushing them to production.

Preview Deployment: To create a preview deployment (useful for testing branches before merging), run:

vercel --pre

This will deploy the branch as a preview, which can be shared and tested before going live.

Assigning a Custom Domain

To assign a custom domain to your deployment:

Add your domain to Vercel:

vercel domains add yourdomain.com

Update your DNS settings by following the instructions provided by Vercel.

Set the domain for production:

vercel alias yourdeploymenturl yourdomain.com

Verify the domain:

vercel domains inspect yourdomain.com

Logging Out

To log out of the Vercel CLI:

vercel logout

Learn More

Next.js Documentation - Learn about Next.js features and API.

Auth.js Documentation - Authentication setup.

TanStack Query - Data fetching and state management.

Vercel Documentation - Deployment and configuration guidance.

Depshield aims to provide seamless security and dependency management for modern development workflows.