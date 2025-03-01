const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const SERVICE_ACCOUNT_FILE = "./soundtrack-your-life-f1f0aefc4925.json";

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth });

app.get("/events", async (req, res) => {
    try {
        const response = await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });
        res.json(response.data.items);
        console.log(response);
    } catch (error) {
        res.status(500).send(error);
        console.error("goolgle api error",error)
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
