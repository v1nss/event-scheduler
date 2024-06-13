CREATE DATABASE eventscheduler;

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_start VARCHAR(50),
    event_end VARCHAR(50),
    location VARCHAR(255),
    event_cost VARCHAR(50),
    -- event_status BOOLEAN
    company_name VARCHAR(255),
    event_product VARCHAR(50),
    event_type VARCHAR(50),
    mobile_number VARCHAR(12),
    event_email VARCHAR(50),
    event_staff VARCHAR(15),
    event_space TEXT,
    rental_fee NUMERIC,
    not_allowed TEXT[],
    materials_toBring TEXT[],
    requirements TEXT[]
    -- allowed TEXT,
)`