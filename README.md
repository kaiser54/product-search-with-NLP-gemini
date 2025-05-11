# Product Search App with Next.js and Google Gemini API

This is a product search application built with Next.js that implements both regular keyword search and semantic search powered by Google's Gemini API.

## Features

- Regular search that matches keywords in product names, descriptions, categories, and tags
- Semantic search using Google Gemini API for natural language understanding
- Toggle between regular and semantic search modes
- Responsive product card grid with detailed product information
- Clean, modern UI built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Google Gemini API key (get it from [AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/product-search-app.git
cd product-search-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Copy the `.env.local.example` file to `.env.local` and add your Google Gemini API key:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and replace `your_gemini_api_key_here` with your actual API key.

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

### Regular Search

The regular search feature performs a simple keyword-based search across product names, descriptions, categories, and tags. This is handled on the server-side with the `/api/search` API route.

### Semantic Search

The semantic search feature uses Google's Gemini API to understand the intent behind a user's search query. It can match products based on meaning rather than just keywords.

For example, a search for "something to keep my coffee hot" might return insulated tumblers and coffee machines, even if they don't explicitly mention those keywords.

This is handled by the `/api/semantic-search` API route which uses the Gemini API to analyze the query and product data.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [Google Generative AI (Gemini)](https://ai.google.dev/) - Google's multimodal AI model
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Customization

### Adding More Products

To add more products to the application, update the `public/products.json` file with your product data. The app will automatically use the updated product list.

### Modifying the Semantic Search

You can customize how the semantic search works by modifying the prompt in `lib/gemini.js`. Adjusting the prompt can help the AI better understand specific types of queries for your product catalog.# product-search-with-NLP-gemini
