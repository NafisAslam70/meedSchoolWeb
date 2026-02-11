-- Creates CMS tables for admin-managed assets and page content
CREATE TABLE IF NOT EXISTS assets (
  id serial PRIMARY KEY,
  page varchar(100) NOT NULL,
  slot varchar(100) NOT NULL,
  url text NOT NULL,
  alt text,
  width varchar(20),
  height varchar(20),
  mime varchar(100),
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS page_content (
  id serial PRIMARY KEY,
  page varchar(100) NOT NULL,
  key varchar(150) NOT NULL,
  value text NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);
