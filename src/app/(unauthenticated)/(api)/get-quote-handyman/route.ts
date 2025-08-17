import { type NextRequest, NextResponse } from 'next/server';
import { mailTransport } from '../../../(authenticated)/_lib/smtp/nodemailer';
import { HandymanSurveyPayload } from '../../handyman/components/HandymanSurveryForm';

const RECAPTCHA_SECRET =
  process.env.NODE_ENV === 'development'
    ? process.env.RECAPTCHA_SECRET_DEV
    : process.env.RECAPTCHA_SECRET;

const formatSurveyData = (
  raw: HandymanSurveyPayload
) => `Job Desc: ${raw.jobDesc.comment}
Location: ${raw.location.zipcode}
Preferred Date: ${raw.jobDesc.preferredDate}
Time Window: ${raw.jobDesc.timeWindow}
First Name: ${raw.contacts.firstName}
Last Name: ${raw.contacts.lastName}
Email: ${raw.contacts.email}
Phone: ${raw.contacts.phone}
Contact Method: ${raw.contacts.method}`;
export async function POST(req: NextRequest) {
  try {
    if (!RECAPTCHA_SECRET) throw new Error('recaptcha failure');

    //verify recaptcha
    const recaptchaToken = req.nextUrl.searchParams.get(
      'recaptcha-token'
    );

    if (!recaptchaToken)
      throw new Error('recaptcha token missing in url');

    const body = <HandymanSurveyPayload>await req.json();

    const testURL = new URL(
      'https://www.google.com/recaptcha/api/siteverify'
    );

    testURL.searchParams.append('secret', RECAPTCHA_SECRET);
    testURL.searchParams.append('response', recaptchaToken);

    const recaptchaTestResults = await fetch(testURL, {
      method: 'POST',
    });

    if (!recaptchaTestResults.ok)
      throw new Error("Couldn't verify recaptcha token");

    const testResultsData: { success: boolean } =
      await recaptchaTestResults.json();

    if (!testResultsData.success)
      return NextResponse.json(
        { message: 'recaptcha challenge failed' },
        { status: 400, statusText: 'recaptcha challenge failed' }
      );

    const result = await mailTransport({
      from: {
        address: 'kwadwoneer@yahoo.com',
        name: 'no-reply',
      },
      to: 'dollarmasters@gmail.com',
      subject: 'Handyman lead',
      text: formatSurveyData(body),
    });

    console.log(result);

    return NextResponse.json(
      { message: 'client sent' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: (<Error>error).message },
      { status: 500 }
    );
  }
}
