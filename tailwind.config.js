// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-green-600',
    'bg-red-500',
    'text-white',
    'text-2xl',
    'min-h-screen',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'rounded'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}