const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/events", async (req, res) => {
    try {
        const { 
            event_name, 
            event_description, 
            event_start, 
            event_end, 
            location, 
            event_cost,
            company_name,
            event_product,
            event_type,
            mobile_number,
            event_email,
            event_staff,
            event_space,
            rental_fee,
            not_allowed,
            materials_toBring,
            requirements
        } = req.body;

        const newEvent = await pool.query(
            `INSERT INTO events (
                event_name, 
                event_description, 
                event_start, 
                event_end, 
                location, 
                event_cost,
                company_name,
                event_product,
                event_type,
                mobile_number,
                event_email,
                event_staff,
                event_space,
                rental_fee,
                not_allowed,
                materials_toBring,
                requirements
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [
                event_name, 
                event_description, 
                event_start, 
                event_end, 
                location, 
                event_cost,
                company_name,
                event_product,
                event_type,
                mobile_number,
                event_email,
                event_staff,
                event_space,
                rental_fee,
                not_allowed,
                materials_toBring,
                requirements
            ]
        );
        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/events", async (req, res) => {
    try {
        const allEvents = await pool.query("SELECT * FROM events");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
})

app.get("/events/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const events = await pool.query("SELECT * FROM events WHERE event_id = $1", [id]);

        if (events.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(events.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
})

app.put("/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            event_name, 
            event_description, 
            event_start, 
            event_end, 
            location, 
            event_cost,
            company_name,
            event_product,
            event_type,
            mobile_number,
            event_email,
            event_staff,
            event_space,
            rental_fee,
            not_allowed,
            materials_toBring,
            requirements
        } = req.body;
        
        const updateEvent = await pool.query(
            `UPDATE events SET 
                event_name = $1, 
                event_description = $2, 
                event_start = $3, 
                event_end = $4, 
                location = $5, 
                event_cost = $6,
                company_name = $7,
                event_product = $8,
                event_type = $9,
                mobile_number = $10,
                event_email = $11,
                event_staff = $12,
                event_space = $13,
                rental_fee = $14,
                not_allowed = $15,
                materials_toBring = $16,
                requirements = $17
            WHERE event_id = $18 RETURNING *`,
            [
                event_name, 
                event_description, 
                event_start, 
                event_end, 
                location, 
                event_cost,
                company_name,
                event_product,
                event_type,
                mobile_number,
                event_email,
                event_staff,
                event_space,
                rental_fee,
                not_allowed,
                materials_toBring,
                requirements,
                id
            ]
        );

        if (updateEvent.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json("Event has been updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEvent = await pool.query("DELETE FROM events WHERE event_id = $1", [id]);
        res.json("Event was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
