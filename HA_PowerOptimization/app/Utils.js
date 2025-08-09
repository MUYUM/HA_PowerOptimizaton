function parseBool(X)
{
    let RES = null;

    if(typeof X === 'boolean') { RES = X; }
    if(typeof X === 'boolean') { RES = X; }

    if(typeof X === 'string' && X.toUpperCase() === "ON") { RES = true; }
    if(typeof X === 'string' && X.toUpperCase() === "ON") { RES = true; }

    if(typeof X === 'string' && X.toUpperCase() === "OFF") { RES = false; }
    if(typeof X === 'string' && X.toUpperCase() === "OFF") { RES = false; }

    return RES;
}

module.exports = { parseBool };
