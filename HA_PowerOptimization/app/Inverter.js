const Status = 
{
    S0: 'S0',
    S1: 'S1',
    SA: 'SA'
};

class Inverter
{
    constructor(UID)
    {
        this.UID = UID;
        this.status = Status.SA;
    }

    SetStatus(X)
    {
        if(X === 'ON') { this.status = Status.S1; }
        if(X === 'OFF') { this.status = Status.S0; }
        if(X === 'AUTO') { this.status = Status.SA; }

        console.log(`Inverter ${this.UID} status changed to: ${X}`);

        
    }

    
}

module.exports = Inverter;

