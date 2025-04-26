import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from './stack';

// Authentication middleware enabled. Protects /students routes.
export default async function middleware(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    // console.log('MIDDLEWARE: user =', user, 'request.url =', request.url);
    if (!user) {
      // Pass error info in query string for debugging
      const debugUrl = new URL('/handler/sign-in', request.url);
      debugUrl.searchParams.set('debug', 'no-user');
      debugUrl.searchParams.set('original', request.url);
      return NextResponse.redirect(debugUrl);
    }
    return NextResponse.next();
  } catch (error) {
    // console.error('MIDDLEWARE ERROR:', error, 'request.url =', request.url);
    // Redirect to a debug page with error info in the query string
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('msg', String(error));
    errorUrl.searchParams.set('original', request.url);
    return NextResponse.redirect(errorUrl);
  }
}

export const config = {
  // You can add your own route protection logic here
  // Make sure not to protect the root URL, as it would prevent users from accessing static Next.js files or Stack's /handler path
  matcher: ['/students/:path*'],
};
