Here's the flow I'd follow
Phase 1

Backend

Download

↓

Parse

↓

Return JSON

(Done)

Phase 2

Frontend

Create a React app.

Nothing fancy.

Just:

Fetch /satellites

↓

Show JSON

↓

Loading

↓

Error state

That's enough.

No globe.

No Cesium.

No styling.

Just prove the frontend and backend communicate.

Phase 3

Backend

Add Skyfield.

Return:

{
    "latitude": ...
}
Phase 4

Frontend

Replace the JSON with a table.

ISS

Latitude

Longitude

Altitude

Now we have a real application.

Phase 5

Frontend

Replace the table with a globe.

Phase 6

Backend

Redis

Phase 7

Frontend

Live updates