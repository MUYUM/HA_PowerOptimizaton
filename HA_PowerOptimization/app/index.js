const PowerOptimizer = require('./PowerOptimizer.js');

console.log(process.env);

async function MAIN()
{
    const optimizer = new PowerOptimizer();
    
    console.log('Power Optimizer initialized');
}

MAIN();
