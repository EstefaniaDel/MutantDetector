import { NextResponse } from 'next/server';

const API_URL = 'http://app:8080';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/mutant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(
      data,
      { status: response.status }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}
