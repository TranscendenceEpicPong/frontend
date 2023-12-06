export function isObject(v)
{
    return typeof v === 'object' &&
        !Array.isArray(v) &&
        v !== null
}

export function isArray(v)
{
    return typeof v === 'object' &&
        Array.isArray(v) &&
        v !== null
}


function checkParams(params, schema)
{
    if (!isObject(params))
    {
        console.error(`${params} is not a valid params object`)
        return {}
    }
    Object.entries(params).forEach((k, v) => {
        if (typeof v !== schema[k])
        {
            console.error(`${k} must be a ${schema[k]}, got: ${v}`);
            return {}
        }
    })
    return params;
}