# StackStart 🚀

**One-Click Developer Environment Setup**

Instantly generate Dockerized project environments from GitHub repos or custom stack selections. Get your team up and running in minutes.

## ✨ Features

- **GitHub Integration**: Import repositories and auto-detect tech stacks
- **Template Marketplace**: Browse and use pre-built project templates
- **Custom Stack Selection**: Manually configure frontend, backend, and database
- **Docker Generation**: Create complete Docker environments
- **Modern UI**: Clean, responsive interface with dark/light mode
- **Authentication**: Secure login with Google OAuth and email/password
- **Account Connections**: Link GitHub, GitLab, and Bitbucket accounts

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Supabase (Auth, Database)
- **Deployment**: Vercel, Netlify, or any static hosting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stackstart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**
   - Create a new Supabase project
   - Enable Google OAuth in Authentication settings
   - Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Create users table
   create table users (
     id uuid primary key default uuid_generate_v4(),
     name text,
     email text,
     avatar text,
     subscription_plan text default 'free',
     onboarding_complete boolean default false,
     created_at timestamp with time zone default timezone('utc'::text, now()),
     updated_at timestamp with time zone default timezone('utc'::text, now())
   );

   -- Enable RLS
   alter table users enable row level security;
   create policy "Users can view own profile" on users for select using (auth.uid() = id);
   create policy "Users can update own profile" on users for update using (auth.uid() = id);
   create policy "Users can insert own profile" on users for insert with check (auth.uid() = id);
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Deploy** - Vercel will automatically build and deploy

### Netlify

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Build command**: `npm run build`
4. **Publish directory**: `dist`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🔧 Configuration

### Supabase OAuth Setup

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google OAuth
4. Add your domain to the redirect URLs

### Custom Domains

Update your Supabase redirect URLs to include your production domain:
```
https://yourdomain.com/auth/callback
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── home.tsx        # Main homepage
│   ├── Settings.tsx    # User settings
│   └── ...
├── contexts/           # React contexts
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── main.tsx           # App entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@stackstart.com

---

Built with ❤️ by the StackStart Team

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
