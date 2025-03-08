import { type NextRequest, NextResponse } from 'next/server';
import { transporter } from './nodemailer';
import type { SentMessageInfo, SendMailOptions } from 'nodemailer';


const packageTransport = ( msgConfig: SendMailOptions ) => new Promise<SentMessageInfo>( ( resolve, reject ) =>
{
  transporter.sendMail( msgConfig, ( err, info ) =>
  {
    if ( err ) reject( err );

    resolve( info )
    })
})
export async function POST(req: NextRequest) {
  const body: Record<string,string> = await req.json();

  try {
    
    const result = await packageTransport( {
    from: 'no-reply@lead-generator.com',
    to: 'dollarmasters@gmail.com',
    subject: 'lead',
    text: JSON.stringify( body )
    } )
  
    console.log( result )

  return NextResponse.json({ message: 'client send' }, { status: 200 });

  } catch (error) {

    console.log( error );

    return NextResponse.json({ message: ( <Error>error ).message }, { status: 500 })
  }

}
