import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 启用类切换暗黑模式
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 可以在这里添加自定义的暗黑模式颜色
    },
  },
  plugins: [],
}
export default config