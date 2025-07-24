const axios = require('axios');

class Battery
{
    constructor(sensor)
    {
        this.sensor = sensor;
        this.capacity = 0;
        this.SOC = 0;

        // setInterval(this.printData.bind(this), 1000);
    }

    printData()
    {
        let txt = "";

        txt += "Battery capacity: " + this.capacity + "%\n";
        txt += "Battery state of charge: " + this.SOC + "%\n";

        console.log(txt);
    }
}

module.exports = Battery;

