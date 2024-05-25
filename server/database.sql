CREATE DATABASE eventscheduler;

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_start TIME,
    event_end TIME,
    location VARCHAR(255),
    event_cost VARCHAR(50)
);