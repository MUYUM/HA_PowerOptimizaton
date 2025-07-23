const WebSocket = require('ws');

const HA_WS = 'ws://host.docker.internal:8123/api/websocket';
const TOKEN = process.env.HA_TOKEN;

const ws = new WebSocket(HA_WS);

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
});
