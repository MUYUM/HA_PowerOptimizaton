

class PowerMeter
{
    constructor(UID)
    {
        this.UID = UID;

        this.SensorCurrent = 0;
        this.SensorVoltage = 0;

        // setInterval(() => this.Print(), 1000);
    }

    SetSensorCurrent(X) { this.SensorCurrent = parseFloat(X); }
    SetSensorVoltage(X) { this.SensorVoltage = parseFloat(X); }

    GetPower() { return this.SensorCurrent * this.SensorVoltage; }
    GetVoltage() { return this.SensorVoltage; }
    GetCurrent() { return this.SensorCurrent; }

    Print()
    {
        console.log(`PowerMeter: Current: ${this.SensorCurrent} A, Power: ${this.GetPower()}`);
    }
}

module.exports = PowerMeter;

