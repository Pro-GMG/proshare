// api/socket.js
import { WebSocketServer } from 'ws';

const clients = new Map();

export default async function handler(req, res) {
    if (req.headers.upgrade === 'websocket') {
        const wss = new WebSocketServer({ noServer: true });

        wss.on('connection', (ws) => {
            let userName = null;
            let userIP = req.headers['x-forwarded-for'] || '0.0.0.0';

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);

                    // ============================================
                    // 1. KAYIT (register)
                    // ============================================
                    if (data.type === 'register') {
                        userName = data.name;
                        clients.set(userName, { ws, ip: userIP });
                        ws.send(JSON.stringify({ type: 'your-ip', ip: userIP }));
                        broadcastPeers();
                        console.log(`✅ ${userName} bağlandı (${userIP})`);
                    }

                    // ============================================
                    // 2. ÇIKIŞ (leave) - BURAYI EKLEDİM
                    // ============================================
                    if (data.type === 'leave') {
                        if (userName) {
                            clients.delete(userName);
                            broadcastPeers();
                            console.log(`❌ ${userName} ayrıldı`);
                        }
                    }

                    // ============================================
                    // 3. ŞİFRE KONTROLÜ (auth_check)
                    // ============================================
                    if (data.type === 'auth_check') {
                        const target = clients.get(data.target);
                        if (target) {
                            // Şifre kontrolü (basit)
                            const targetPassword = target.password || '';
                            if (targetPassword && targetPassword !== data.password) {
                                ws.send(JSON.stringify({
                                    type: 'auth_result',
                                    status: 'error',
                                    message: 'Şifre yanlış!'
                                }));
                                return;
                            }
                            ws.send(JSON.stringify({
                                type: 'auth_result',
                                status: 'ok'
                            }));
                        } else {
                            ws.send(JSON.stringify({
                                type: 'auth_result',
                                status: 'error',
                                message: 'Hedef bulunamadı'
                            }));
                        }
                    }

                    // ============================================
                    // 4. WEBRTC SİNYALLERİ (offer, answer, candidate)
                    // ============================================
                    if (data.type === 'offer' || data.type === 'answer' || data.type === 'candidate') {
                        const target = clients.get(data.target);
                        if (target) {
                            target.ws.send(JSON.stringify({
                                type: data.type,
                                from: userName,
                                sdp: data.sdp || undefined,
                                candidate: data.candidate || undefined
                            }));
                            console.log(`📤 ${data.type} -> ${data.target}`);
                        } else {
                            console.log(`❌ Hedef bulunamadı: ${data.target}`);
                        }
                    }

                } catch (err) {
                    console.warn('Mesaj hatası:', err);
                }
            });

            ws.on('close', () => {
                if (userName) {
                    clients.delete(userName);
                    broadcastPeers();
                    console.log(`❌ ${userName} bağlantısı koptu`);
                }
            });
        });

        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            wss.emit('connection', ws, req);
        });

        return;
    }

    res.status(200).json({ message: 'ProShare WebSocket' });
}

// ============================================================
//  TÜM CİHAZLARA PEER LİSTESİ GÖNDER
// ============================================================

function broadcastPeers() {
    const peers = Array.from(clients.keys());
    const message = JSON.stringify({ type: 'peers', peers });
    for (const data of clients.values()) {
        try {
            if (data.ws.readyState === 1) {
                data.ws.send(message);
            }
        } catch (e) {}
    }
}
