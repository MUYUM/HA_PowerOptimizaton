class BatteryPool
{
    constructor(UID)
    {
        this.UID = UID;
        this.batteries = [];

        this.SensorSOC = null;

        // setInterval(this.Print.bind(this), 1000);
    }

    addBattery(battery)
    {
        this.batteries.push(battery);
    }

    GetMaxCapacity() { return this.batteries.reduce((T, B) => T + B.SensorMaxCapacity, 0); }
    GetCurCapacity() { return this.batteries.reduce((T, B) => T + B.SensorCurCapacity, 0); }

    GetSOC()
    {
        return this.SensorSOC !== null ? this.SensorSOC : (this.GetCurCapacity() / this.GetMaxCapacity()) * 100;
    }

    SetSOC(X) { this.SensorSOC = parseFloat(X); }

    Print()
    {
        console.log(`BatteryPool: Max Capacity: ${this.GetMaxCapacity()} Ah, Current Capacity: ${this.GetCurCapacity()} Ah, SOC: ${this.GetSOC()}%`);
    }
}

module.exports = BatteryPool;
