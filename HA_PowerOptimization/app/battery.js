const axios = require('axios');
const sprintf = require('sprintf-js').sprintf;
const { parseBool } = require('./Utils.js');

class Battery
{
    constructor(UID, MaxCapacity)
    {
        this.UID = UID;

        this.SensorVoltage = 0; // V
        this.SensorMaxCapacity = MaxCapacity; // Ah
        this.SensorCurCapacity = 0; // Ah

        this.AllowCharging = null; // true if battery is charging, false if discharging
        this.AllowDischarging = null; // true if battery can discharge, false if it cannot

        setInterval(this.printData.bind(this), 1000);
    }

    SetSensorMaxCapacity(X) { this.SensorMaxCapacity = parseFloat(X); }
    SetSensorCurCapacity(X) { this.SensorCurCapacity = parseFloat(X); }
    SetAllowCharging(X) { this.AllowCharging = parseBool(X); }
    SetAllowDischarging(X) { this.AllowDischarging = parseBool(X); }

    GetSOC() { return (this.SensorCurCapacity / this.SensorMaxCapacity) * 100; }

    printData()
    {
        let TXT = "";

        TXT = TXT + sprintf("Battery UID: %20s\n", this.UID);
        TXT = TXT + sprintf("-----------------\n");
        TXT = TXT + sprintf("SOC: %5.2f\n", this.GetSOC());
        TXT = TXT + sprintf("Charging: %s\n", this.AllowCharging ? "Yes" : "No");
        TXT = TXT + sprintf("Discharging: %s\n", this.AllowDischarging ? "Yes" : "No");

        console.log(TXT);
    }
}

class Battery12V100Ah extends Battery { constructor(UID) { super(UID, 100); } }
class Battery12V200Ah extends Battery { constructor(UID) { super(UID, 200); } }

module.exports = { Battery, Battery12V100Ah, Battery12V200Ah };

