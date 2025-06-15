import { type NextRequest, NextResponse } from 'next/server';

const ALLOWED_SURVEY_CATEGORIES = [
  'security',
  'pool',
  'landscaping',
  'pest-control',
];

const ADMIN_SECRET = process.env.ADMIN_CREATION_SECRET;
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith('/survey'))
    return ALLOWED_SURVEY_CATEGORIES.includes(
      path.split('/').pop() ?? ''
    )
      ? NextResponse.next()
      : NextResponse.error();

  if (path.startsWith('/dashboard/admin/create-admiÏn')) {
    const hasAuthHeader = req.headers.has('Admin-Authorization');

    if (!hasAuthHeader) return NextResponse.error();

    const hasCorrectAdminSecret =
      req.headers.get('Admin-Authorization') === ADMIN_SECRET;

    const urlParams = req.nextUrl.searchParams;

    const hasEmailOrCreationToken =
      urlParams.has('email') || urlParams.has('token');

    return hasCorrectAdminSecret && hasEmailOrCreationToken
      ? NextResponse.next()
      : NextResponse.error();
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [ '/survey/:path*' ]
// }
