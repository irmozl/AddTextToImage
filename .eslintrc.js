// .eslintrc.js
module.exports = {
	// Use a simple parser (avoid dynamic functions)
	parser: '@typescript-eslint/parser', // For TS projects
	// OR for plain JavaScript:
	// parser: '@babel/eslint-parser',
	
	parserOptions: {
	  ecmaVersion: 'latest',
	  sourceType: 'module',
	  ecmaFeatures: {
		jsx: true, // Enable if using JSX (React/Next.js)
	  },
	  // Disable Babel config requirement
	  requireConfigFile: false,
	  // Add if using TypeScript
	  project: './tsconfig.json',
	},
  
	// Essential plugins for Next.js
	plugins: ['@typescript-eslint'],
	extends: [
	  'next/core-web-vitals', // Next.js recommended rules
	  'eslint:recommended',
	  // Add TypeScript if needed:
	  'plugin:@typescript-eslint/recommended',
	],
  
	// Custom rules (keep minimal for deployment)
	rules: {
	  'no-console': 'warn', // Example rule
	},
  };