CREATE DATABASE eventscheduler;

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_start VARCHAR(50),
    event_end VARCHAR(50),
    location VARCHAR(255),
    event_cost VARCHAR(50)
);