const PowerMedium = 
{
    S_LPG: 'S_LPG',
    S_12V: 'S_12V',
    S_220: 'S_220'
};

class Fridge
{
    constructor(UID)
    {
        this.UID = UID;
        this.status = 'OFF'; // Default status
        this.temperature = 4; // Default temperature in Celsius
    }

    SetStatus(X)
    {
        this.status = X;
        console.log(`Fridge ${this.UID} status changed to: ${X}`);
    }
}

module.exports = Fridge;