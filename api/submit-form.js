// api/submit-form.js
import { Client } from "pg";

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
    await client.query(
      "INSERT INTO contact_form (name, email, phone, zipcode, age, income, deductible, medications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [name, email, phone, zipcode, age, income, deductible, medications]
    );

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};
