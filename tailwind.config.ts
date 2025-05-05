import type { Config } from "tailwindcss";

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        landing: 'url("/landing.jpg")',
        login: 'url("/login.jpg")',
        login_landing:
          'url("https://media.istockphoto.com/id/1345670548/photo/plumber-fixing-a-pipe-and-talking-to-his-clients-in-the-kitchen.jpg?s=2048x2048&w=is&k=20&c=Mz5jJnblMTYzEaAYT05hTJnk0rHOFWTjWDIaraH9pe8=")',
      },
    },
  },
  plugins: [],
} satisfies Config;
