import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const GoogleCalendar = () => {
    const [ongoingEvent, setOngoingEvent] = useState(null);
    const audioRef = useRef(null); // Reference for the audio player

    useEffect(() => {
        // Fetch events from backend
        axios.get("http://localhost:5001/events")
            .then((response) => {
                checkOngoingEvent(response.data);
            })
            .catch((error) => console.error("Error fetching events:", error));

        // Check for ongoing events every 1 minute
        const interval = setInterval(() => {
            axios.get("http://localhost:5001/events")
                .then((response) => {
                    checkOngoingEvent(response.data);
                })
                .catch((error) => console.error("Error fetching events:", error));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Function to check if there's an ongoing event
    const checkOngoingEvent = (eventsList) => {
        const now = new Date();
        const currentEvent = eventsList.find(event => {
            if (event.start?.dateTime && event.end?.dateTime) {
                const start = new Date(event.start.dateTime);
                const end = new Date(event.end.dateTime);
                return now >= start && now <= end;
            }
            return false;
        });

        if (currentEvent) {
            setOngoingEvent(currentEvent);
            if (audioRef.current) {
                audioRef.current.volume= 1.0;
                audioRef.current.play(); // Play song when an event starts
            }
        } else {
            setOngoingEvent(null);
            if (audioRef.current) {
                audioRef.current.pause(); // Stop song if no event is happening
                audioRef.current.currentTime = 0; // Reset audio position
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Popup Notification */}
            {ongoingEvent && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    padding: "15px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    zIndex: 1000,
                }}>
                    🔴 Ongoing Event: {ongoingEvent.summary}
                </div>
            )}

            {/* Audio Player (Hidden) */}
            <audio ref={audioRef} src="./src/assets/songs/The_Duck_Song.mp3" preload="auto" />
        </div>
    );
};

export default GoogleCalendar;
