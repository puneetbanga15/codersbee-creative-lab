# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/55ef7545-c199-48f3-b885-e2604f988f95

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/55ef7545-c199-48f3-b885-e2604f988f95) and start prompting.

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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Using Lovable (Recommended for development)

Simply open [Lovable](https://lovable.dev/projects/55ef7545-c199-48f3-b885-e2604f988f95) and click on Share -> Publish.

### Option 2: Using Netlify with Custom Domain

To deploy to Netlify with a custom domain, follow these steps:

1. **Prepare Your Repository**
   - Make sure your repository is public on GitHub
   - If it's private, you'll need to authorize Netlify to access it

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account if you haven't already
   - Select your repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: 18 (or higher)

3. **Environment Variables**
   - Add the following environment variables in Netlify's dashboard:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase project's anon/public key

4. **Configure Custom Domain**
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow Netlify's instructions to configure your DNS settings

5. **Build Command**
   The project is configured to use Vite, so Netlify will automatically:
   - Install dependencies with `npm install`
   - Build the project with `npm run build`
   - Deploy the contents of the `dist` directory

For more detailed instructions, visit our docs: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Troubleshooting Deployment

If you encounter issues:

1. **Repository Not Found Error**
   - Make sure your repository is public or Netlify has proper access
   - Verify the repository URL is correct
   - Try reconnecting your GitHub account to Netlify

2. **Build Errors**
   - Check Netlify's deploy logs
   - Ensure all environment variables are set correctly
   - Verify Node.js version is 18 or higher in Netlify settings

For additional help, consult [Netlify's documentation](https://docs.netlify.com/) or reach out to support.