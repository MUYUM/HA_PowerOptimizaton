const Status = 
{
    S0: 'S0',
    S1: 'S1'
};

class Inverter
{
    constructor(UID)
    {
        this.UID = UID;
        this.status = Status.S0;
    }

    SetStatus(X)
    {
        if(X === 'ON') { this.status = Status.S1; }
        if(X === 'OFF') { this.status = Status.S0; }

        console.log(`Inverter ${this.UID} status changed to: ${X}`);
    }
}

module.exports = Inverter;

