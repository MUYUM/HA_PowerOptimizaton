class PowerMeter
{
    constructor(sensor)
    {
        this.sensor = sensor;
        this.current = 0; // Amps
    }

    setCurrent(current)
    {
        this.current = current;
    }

    getCurrent()
    {
        return this.current;
    }
}

module.exports = PowerMeter;