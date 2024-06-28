# Changelog

## [Unreleased]

### Added
- Added `contact_form` table to the PostgreSQL database on Vercel. The structure of the table is as follows:

```sql
CREATE TABLE contact_form (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  age INTEGER NOT NULL,
  income VARCHAR(50) NOT NULL,
  deductible VARCHAR(50) NOT NULL,
  medications TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
