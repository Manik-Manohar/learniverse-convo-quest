
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
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Troubleshooting

If you encounter the error "'vite' is not recognized as an internal or external command" or "localhost not found" issues, try these solutions:

**Option 1: Use our easy start script (recommended)**
```sh
node start-dev.js
```

**Option 2: Run the setup script**
```sh
node setup.js
```

**Option 3: Use npx to run Vite**
```sh
npx vite --host 0.0.0.0 --port 8080
```

**Option 4: Install Vite globally**
```sh
npm install -g vite
vite --host 0.0.0.0 --port 8080
```

**Option 5: Check for port conflicts**
Port 8080 might be in use by another application. Try changing the port in vite.config.ts or stop other applications that might be using this port.

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
