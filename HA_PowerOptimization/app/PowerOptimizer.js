const Battery = require('./battery.js');
const PowerMeter = require('./powerMeter.js');
const ConnectorHA = require('./ConnectorHA.js');


class PowerOptimizer
{
    constructor()
    {
        this.ConnectorHA = new ConnectorHA();

        this.PowerMeter = new PowerMeter("sensor.esphome_web_33e73c_battery_current_main_shunt");
        this.Battery = new Battery("sensor.esphome_web_2ed7a8_bat1_capacity_remaining");

        this.ConnectorHA.registerComponent(this.PowerMeter);
        this.ConnectorHA.registerComponent(this.Battery);

        setInterval(this.calulateTimeRemaining.bind(this), 1000);
    }

    calulateTimeRemaining()
    {
        let batteryCapacity = this.Battery.capacity;
        let powerConsumption = this.PowerMeter.getCurrent();
        let timeRemaining = batteryCapacity / powerConsumption;

        console.log("Battery Capacity: ", batteryCapacity);
        console.log("Power Consumption: ", powerConsumption);
        console.log(`Time remaining: ${timeRemaining} hours`);

        return timeRemaining;
    }

}

module.exports = PowerOptimizer;

