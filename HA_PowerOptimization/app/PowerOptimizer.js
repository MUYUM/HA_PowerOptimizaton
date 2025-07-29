const { Battery12V100Ah } = require('./Battery.js');
const PowerMeter = require('./powerMeter.js');
const ConnectorHA = require('./ConnectorHA.js');
const BatteryPool = require('./BatteryPool.js');
const Inverter = require('./inverter.js');
const WaterHeater = require('./waterHeater.js');

class PowerOptimizer
{
    constructor()
    {
        this.ConnectorHA = new ConnectorHA();

        this.Inverter = new Inverter("Victron Phoenix 12/1200");

        this.WaterHeater = new WaterHeater("Truma Therme TT2");

        this.BatteryPool = new BatteryPool();

        this.PowerMeter = new PowerMeter("Victron SmartShunt 500A");

        this.Battery1 = new Battery12V100Ah("Vatrer 12V 100Ah - DP04S007L4S100A - 1");
        this.Battery2 = new Battery12V100Ah("Vatrer 12V 100Ah - DP04S007L4S100A - 2");

        this.ConnectorHA.RegisterSensor("sensor.esphome_web_2ed7a8_bat1_capacity_remaining", (X) => this.Battery1.SetSensorCurCapacity(X));
        this.ConnectorHA.RegisterSensor("sensor.esphome_web_2ed7a8_bat2_capacity_remaining", (X) => this.Battery2.SetSensorCurCapacity(X));

        this.ConnectorHA.RegisterSensor("sensor.esphome_web_33e73c_battery_current_main_shunt", (X) => this.PowerMeter.SetSensorCurrent(X));
        this.ConnectorHA.RegisterSensor("sensor.esphome_web_33e73c_battery_voltage_main_shunt", (X) => this.PowerMeter.SetSensorVoltage(X));

        this.ConnectorHA.RegisterSensor("sensor.esphome_web_33e73c_state_of_charge", (X) => this.BatteryPool.SetSOC(X));

        this.ConnectorHA.RegisterSensor("input_select.inverter", (X) => this.Inverter.SetStatus(X));
        this.ConnectorHA.RegisterSensor("input_select.water_heater", (X) => this.WaterHeater.SetStatus(X));

        this.ConnectorHA.RegisterSwitch("switch.relaymodule10_01_water_heater", this.WaterHeater.E);

        this.BatteryPool.addBattery(this.Battery1);
        this.BatteryPool.addBattery(this.Battery2);

        // setInterval(this.calulateTimeRemaining.bind(this), 1000);
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

