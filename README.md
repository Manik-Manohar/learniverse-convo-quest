
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9d3c0b7f-2d27-4955-8259-a247ddca1eff

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9d3c0b7f-2d27-4955-8259-a247ddca1eff) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npx vite --host
```

### Troubleshooting

If you encounter errors when trying to run the project locally, try these solutions:

**Option 1: Use the start script (recommended)**
```sh
node start-dev.js
```

**Option 2: Make sure Vite is installed**
```sh
npm install --save-dev vite
npx vite --host
```

**Option 3: Install Vite globally**
```sh
npm install -g vite
vite --host
```

**Option 4: Check your browser URL**
Make sure you're using the correct URL displayed in your terminal. By default, Vite runs on http://localhost:5173/ 
unless configured otherwise in vite.config.ts.

**Option 5: Check for port conflicts**
If another application is using the port, close it or configure Vite to use a different port with:
```sh
npx vite --host --port 3000
```

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9d3c0b7f-2d27-4955-8259-a247ddca1eff) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
