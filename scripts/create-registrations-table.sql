CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  grade VARCHAR(100) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT,
  tx_ref VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
