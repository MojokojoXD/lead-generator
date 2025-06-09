import { type NextRequest, NextResponse } from 'next/server';
import { transporter } from './nodemailer';
import type { SentMessageInfo, SendMailOptions } from 'nodemailer';

const packageTransport = (msgConfig: SendMailOptions) =>
  new Promise<SentMessageInfo>((resolve, reject) => {
    transporter.sendMail(msgConfig, (err, info) => {
      if (err) reject(err);

      resolve(info);
    });
  });

const RECAPTCHA_SECRET =
  process.env.NODE_ENV !== 'development'
    ? process.env.RECAPTCHA_SECRET_DEV
    : process.env.RECAPTCHA_SECRET;
export async function POST(req: NextRequest) {
  try {
    if ( !RECAPTCHA_SECRET )
      throw new Error( 'recaptcha failure' );

    //verify recaptcha
    const recaptchaToken = req.nextUrl.searchParams.get( 'recaptcha-token' );

    if ( !recaptchaToken )
      throw new Error( 'recaptcha token missing in url' );

    const body: Record<string, string> = await req.json();


    const testURL = new URL( 'https://www.google.com/recaptcha/api/siteverify' );
    
    testURL.searchParams.append( 'secret', RECAPTCHA_SECRET );
    testURL.searchParams.append('response', recaptchaToken )

    const recaptchaTestResults = await fetch( testURL , {
      method: 'POST',
    });

    if (!recaptchaTestResults.ok) throw new Error("Couldn't verify recaptcha token");

    const testResultsData: { success: boolean; } = await recaptchaTestResults.json();
    
    if (!testResultsData.success)
      return NextResponse.json(
        { message: 'recaptcha challenge failed' },
        { status: 400, statusText: 'recaptcha challenge failed' }
      );

    const result = await packageTransport({
      from: {
        address: 'kwadwoneer@yahoo.com',
        name: 'no-reply',
      },
      to: 'kwadwoneer@gmail.com',
      subject: 'lead',
      text: JSON.stringify(body),
    });

    console.log(result);

    return NextResponse.json({ message: 'client sent' }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: (<Error>error).message }, { status: 500 });
  }
}
