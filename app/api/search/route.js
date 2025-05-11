// app/api/search/route.js
import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/products';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    
    const results = searchProducts(query);
    
    return NextResponse.json({ 
      success: true, 
      results,
      count: results.length,
      query 
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search products' },
      { status: 500 }
    );
  }
}