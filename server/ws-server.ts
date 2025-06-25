import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
dotenv.config();
import { webPort, webSocketUrl, webUrl } from './variables';
import { verifyCredentials, verifyPresentation } from './libs/credential-verifier';
import { detectVCorVP } from './libs/utils';

const webPrefix = '/backend'
const webCallbackRoute = `vp-response-callback`;
const webVerifyRoute = `verify-credentials`;

let webSocketClient: WebSocket;

// Setup Express
const app = express();
app.use(cors({ credentials: true, origin: true }));
// For JSON data
app.use(express.json());
// For form-urlencoded data
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server to HTTP server
const wss = new WebSocketServer({ server, path: `${webPrefix}/ws` });

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

app.get(`${webPrefix}`, (req, res) => {
    res.json({ success: 'Express' });
});

app.post(`${webPrefix}/${webCallbackRoute}`, (req: Request, res: Response) => {
    console.log("Got response from ooru", req.body);
    const payload = req.body;

    //const { vp_token, presentation_submission, state } = payload;
    // if (!vp_token) {
    //     res.status(400).json({ error: 'Missing required fields in the request body' });
    //     return
    // }

    if (webSocketClient && webSocketClient.readyState === WebSocket.OPEN) {
        webSocketClient.send(JSON.stringify(payload));
        res.json({ ok: true });
    } else {
        res.status(400).json({ error: 'WebSocket client not connected, refersh the client to connect' });
    }
});

app.post(`${webPrefix}/${webVerifyRoute}`, async (req: Request, res: Response) => {
    console.log("Verification process started");
    const { data_received } = req.body;

    let result;
    const type = detectVCorVP(data_received);
    if (type === "unknown") {
        res.status(400).json({ isValid: false, errors: 'Unknown type of data received' })
        return;
    } else if (type === "vc") {
        result = await verifyCredentials({
            verifiableCredentials: !Array.isArray(data_received) ? [data_received] : data_received,
        });
    } else if (type === "vp") {
        result = await verifyPresentation({
            verifiablePresentation: data_received,
        });
    }

    res.json(result)
});

// Start both servers on same port
server.listen(webPort, () => {
    console.log(`🚀 Express + WebSocket running on port ${webPort}`);
    console.log(`   🔹 WS: ${webSocketUrl}`);
    console.log(`   🔹 HTTP: ${webUrl}`);
});
