import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sms, contactNo } = await request.json();

    if (!sms || !contactNo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch('https://app.philsms.com/api/v3/sms/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 962|UBwJgT6TYuHswUC4Z2HcxamTllK0DJiwcuLTmSz0',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        recipient: contactNo,
        sender_id: "PhilSMS",
        type: "plain",
        message: sms
      })
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('SMS sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}