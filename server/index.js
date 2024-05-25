const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/events", async(req, res) => {
    try {
        const { event_name, 
            event_description, 
            event_start, 
            event_end, 
            location, 
            event_cost 
        } = req.body;

        const newEvent = await pool.query(
            "INSERT INTO events (event_name, event_description, event_start, event_end, location, event_cost) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [event_name, event_description, event_start, event_end, location, event_cost]
        );
        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
})

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
        const {id} = req.params;

        const events = await pool.query("SELECT * FROM events WHERE event_id = $1", [id])

        if (events.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(events.rows[0]);
    } catch (err) {
        console.error(err.message)
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
            event_cost 
        } = req.body;
        
        const updateEvent = await pool.query(
            "UPDATE events SET event_name = $1, event_description = $2, event_start = $3, event_end = $4, location = $5, event_cost = $6 WHERE event_id = $7 RETURNING *",
            [event_name, event_description, event_start, event_end, location, event_cost, id]
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
        const {id} = req.params;
        const deleteEvent = await pool.query("DELETE FROM events WHERE event_id = $1", [id]);
        res.json("Event was deleted!")
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});