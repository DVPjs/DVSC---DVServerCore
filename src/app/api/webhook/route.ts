import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('Webhook received:', payload);
    return NextResponse.json({ status: 'success', data: payload });
  } catch (error) {
    console.error('Error processing webhook:', error);
    if (error instanceof Error) {
        return new NextResponse(JSON.stringify({ status: 'error', message: error.message }), { status: 400 });
    }
    return new NextResponse(JSON.stringify({ status: 'error', message: 'An unknown error occurred' }), { status: 400 });
  }
}
