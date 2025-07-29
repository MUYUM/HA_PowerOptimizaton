const WebSocket = require('ws');
const EventEmitter = require('events');
const axios = require('axios');

const Battery = require('./Battery.js');
const PowerMeter = require('./powerMeter.js');

class Measurment
{
    constructor(name, value)
    {
        this.name = name;
        this.value = value;
    }
}

class Connector
{
    constructor()
    {
        this.event = new EventEmitter();

        this.ws = new WebSocket(process.env.HA_WS);

        this.ws.on('open', () =>
        {
            this.ws.send(JSON.stringify({ type: 'auth', access_token: process.env.HA_TOKEN }));
        });

        this.ws.on('message', async (data) =>
        {
            const msg = JSON.parse(data);

            if (msg.type === 'auth_ok')
            {
                this.ws.send(JSON.stringify(
                {
                    id: 1,
                    type: 'subscribe_events',
                    event_type: 'state_changed'
                }));

                this.ws.send(JSON.stringify(
                {
                    id: 2,
                    type: 'get_states'
                }));
            }

            if (msg.id === 1 && msg.type === 'event')
            {
                this.event.emit('measurement', new Measurment(msg.event.data.entity_id, msg.event.data.new_state.state));
            }

            if (msg.id === 2 && msg.type === 'result')
            {               
                msg.result.forEach((state) =>
                {
                    this.event.emit('measurement', new Measurment(state.entity_id, state.state));
                });
            }
        });
    }

    async Switch(UID, STA)
    {
        const O =
        {
            method: 'POST',
            url: `${process.env.HA_API}/services/switch/turn_${STA}`,
            data:
            {
                entity_id: UID
            },
            headers:
            {
                'Authorization': `Bearer ${process.env.HA_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }

        await axios(O).then((response) =>
        {
            console.log(response.data);
        })
        .catch((error) =>
        {
            console.error(error);
        });
    }

    RegisterSensor(UID, SetValue)
    {
        this.event.on('measurement', (msg) =>
        {
            if(msg.name === UID)
            {
                SetValue(msg.value);
            }
        });
    }

    RegisterSwitch(UID, GetValue)
    {
        GetValue.on('status', (Value) =>
        {
            this.Switch(UID, Value === "S1" ? 'on' : 'off').then(() =>
            {
                console.log(`Switch ${UID} set to ${Value}`);
            });
        });
    }

    registerComponent(component)
    {
        if(component instanceof PowerMeter)
        {
            this.event.on('measurement', (msg) =>
            {
                if(msg.name === component.sensor)
                {
                    component.setCurrent(parseFloat(msg.value));
                }
            });
        }

        if(component instanceof Battery)
        {
            this.event.on('measurement', (msg) =>
            {
                if(msg.name === component.sensor)
                {
                    component.capacity = parseFloat(msg.value);
                }
            });
        }
    }
}

module.exports = Connector;
