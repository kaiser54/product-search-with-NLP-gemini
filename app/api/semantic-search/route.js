// app/api/semantic-search/route.js
import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';
import { semanticSearch } from '@/lib/gemini';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    
    if (!query) {
      return NextResponse.json({ 
        success: true, 
        results: getAllProducts(),
        count: getAllProducts().length,
        query: '' 
      });
    }
    
    const allProducts = getAllProducts();
    const results = await semanticSearch(query, allProducts);
    
    return NextResponse.json({ 
      success: true, 
      results,
      count: results.length,
      query 
    });
  } catch (error) {
    console.error('Semantic Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform semantic search' },
      { status: 500 }
    );
  }
}