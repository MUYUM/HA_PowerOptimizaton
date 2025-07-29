const axios = require('axios');

class Battery
{
    constructor(UID, MaxCapacity)
    {
        this.UID = UID;

        this.SensorVoltage = 0; // V
        this.SensorMaxCapacity = MaxCapacity; // Ah
        this.SensorCurCapacity = 0; // Ah

        // setInterval(this.printData.bind(this), 1000);
    }

    SetSensorMaxCapacity(X) { this.SensorMaxCapacity = parseFloat(X); }
    SetSensorCurCapacity(X) { this.SensorCurCapacity = parseFloat(X); }
    GetSOC() { return (this.SensorCurCapacity / this.SensorMaxCapacity) * 100; }

    printData()
    {
        let txt = "";

        txt += "Battery capacity: " + this.SensorCurCapacity + "%\n";
        txt += "Battery SOC: " + this.GetSOC() + "%\n";

        console.log(txt);
    }
}

class Battery12V100Ah extends Battery { constructor(UID) { super(UID, 100); } }
class Battery12V200Ah extends Battery { constructor(UID) { super(UID, 200); } }

module.exports = { Battery, Battery12V100Ah, Battery12V200Ah };

