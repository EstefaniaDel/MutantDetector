import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'http://app:8080';

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching statistics' },
      { status: 500 }
    );
  }
}
