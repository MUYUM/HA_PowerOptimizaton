const EventEmitter = require('events');

const Status = 
{
    S0: 'S0',
    S1: 'S1',
    SA: 'SA'
};

class WaterHeater
{
    constructor(UID)
    {
        this.UID = UID;

        this.E = new EventEmitter();

        this.status = Status.SA;
    }

    SetStatus(X)
    {
        if(X === 'ON') { this.status = Status.S1; }
        if(X === 'OFF') { this.status = Status.S0; }
        if(X === 'AUTO') { this.status = Status.SA; }

        console.log(`WaterHeater ${this.UID} status changed to: ${X}`);

        this.E.emit('status', this.status);
    }
}

module.exports = WaterHeater;

