import { Client } from "pg";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  const { name, email, phone, zipcode, age, income, deductible, medications } =
    req.body;

  try {
    // Insert data into the database
    await client.query(
      "INSERT INTO contact_form (name, email, phone, zipcode, age, income, deductible, medications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [name, email, phone, zipcode, age, income, deductible, medications]
    );

    // Debug logging for environment variables
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);

    // Send email to management with lead's information
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let mailOptions = {
      from: '"Lead Website" <graysoncrozier@yahoo.com>', // sender address
      to: "graysoncrozier40@gmail.com", // management email address
      subject: "New Lead Submission",
      text: `New lead submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nZipcode: ${zipcode}\nAge: ${age}\nIncome: ${income}\nDeductible: ${deductible}\nMedications: ${medications}`, // plain text body
      html: `<p>New lead submission received:</p><ul><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> ${email}</li><li><strong>Phone:</strong> ${phone}</li><li><strong>Zipcode:</strong> ${zipcode}</li><li><strong>Age:</strong> ${age}</li><li><strong>Income:</strong> ${income}</li><li><strong>Deductible:</strong> ${deductible}</li><li><strong>Medications:</strong> ${medications}</li></ul>`, // html body
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};
