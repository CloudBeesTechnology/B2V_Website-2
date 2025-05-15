import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { empName, leaveType, startDate, endDate, leaveReason} = body;

    console.log("Received POST request:", body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hariharancbt28@gmail.com",
        pass: "jbxx dbgf monk pmxf",
      },
    });

    const mailOptions = {
      from: "hariharancbt28@gmail.com",
      to: "veda.thiyagarajan@gmail.com",
      subject: `Leave Request from ${empName}`,
      text: `${empName} has applied for ${leaveType} from ${startDate} to ${endDate}.\nReason: ${leaveReason}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);

    return NextResponse.json({ message: "Email sent successfully!", result }, { status: 200 });

  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email", detail: String(error) }, { status: 500 });
  }
}
// app/api/send-email/route.ts
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// // Environment variable setup recommended for production
// // EMAIL_USER and EMAIL_PASS should be set in `.env.local`

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { from, to, subject, text } = body;

//     // Basic validation
//     if (!from || !to || !subject || !text) {
//       return NextResponse.json(
//         { error: "Missing required fields: from, to, subject, or text." },
//         { status: 400 }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER || "hariharancbt28@gmail.com",
//         pass: process.env.EMAIL_PASS || "jbxx dbgf monk pmxf",
//       },
//     });

//     const mailOptions = {
//       from: from,
//       to: to,
//       subject: subject,
//       text: text,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", result);

//     return NextResponse.json(
//       { message: "Email sent successfully!", result },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Email send error:", error);
//     return NextResponse.json(
//       { error: "Failed to send email", detail: String(error) },
//       { status: 500 }
//     );
//   }
// }
