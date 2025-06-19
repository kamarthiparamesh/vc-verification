import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
dotenv.config();
import { hostName, webPort } from './variables';

let webSocketClient: WebSocket;

// Setup Express
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server to HTTP server
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws, req) => {
    console.log('A client connected');
    webSocketClient = ws;

    const heartbeatInterval = setInterval(() => {
        ws.send('ping');
    }, 6000);

    ws.on('message', (message: string) => {
        console.log(`Received message: ${message}`);
        if (message === 'ping') {
            ws.send('pong');
        }
    });

    ws.on('close', () => {
        console.log('A client disconnected');
        clearInterval(heartbeatInterval);
    });
});

app.get('/', (req, res) => {
    res.json({ success: 'Express' });
});

app.post('/ooru/callback', (req: Request, res: Response) => {
    console.log("Got response from ooru", req.body, req.params, req.query);
    const payload = req.body;

    if (webSocketClient && webSocketClient.readyState === WebSocket.OPEN) {
        webSocketClient.send(JSON.stringify(payload));
        res.json({ ok: true });
    } else {
        res.status(400).json({ error: 'WebSocket client not connected, refersh the client to connect' });
    }
});

// Start both servers on same port
server.listen(webPort, () => {
    console.log(`🚀 Express + WebSocket running on port ${webPort}`);
    console.log(`   🔹 WS: ws://${hostName}:${webPort}/ws`);
    console.log(`   🔹 HTTP POST: http://${hostName}:${webPort}/ooru/callback`);
});
