const WebSocket = require('ws');

const HA_WS = 'ws://homeassistant:8123/api/websocket';
const TOKEN = process.env.HA_TOKEN;

const ws = new WebSocket(HA_WS);

console.log('[STARTUP] Power Optimizer add-on started.');

ws.on('open', () => {
    console.log('Connected to Home Assistant WebSocket');
  ws.send(JSON.stringify({ type: 'auth', access_token: TOKEN }));
});

ws.on('message', async (data) => {
  const msg = JSON.parse(data);

  if (msg.type === 'auth_ok') {
    ws.send(JSON.stringify({
      id: 1,
      type: 'subscribe_events',
      event_type: 'state_changed'
    }));
  }

  if (msg.type === 'event')
{
    
    console.log(msg);
  }

  console.log(msg);
});
