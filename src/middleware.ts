import { type NextRequest, NextResponse } from 'next/server';

const ALLOWED_SURVEY_CATEGORIES = [ 'security','pool','landscaping','pest-control' ]
export function middleware( req: NextRequest )
{
  const path = req.nextUrl.pathname.split('/').pop()

  if ( path && !ALLOWED_SURVEY_CATEGORIES.includes( path ) ) return NextResponse.error();

  return NextResponse.next();
}

export const config = {
  matcher: [ '/survey/:path*' ]
}