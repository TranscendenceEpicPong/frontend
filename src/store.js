import {loadPage} from "./router.js";

const store = {};

const schema = {
    route: {
        path: 'string'
    },
    auth: {
        loggedIn: 'boolean',
        user: 'user'
    },
    mode: {
        online: 'boolean'
    },
    game: {
        mode: ['solo', 'duel', 'tournament'],
        tournament: {
            players: 'array'
        }
    }
};

const isValid = (prop, value, schema_prop) => {
    const value_type = typeof value;
    // const schema_type = typeof schema_prop;
    if (schema_prop === 'array' && Object.prototype.toString.call(value_type) === '[object Array]')
    {
        return true;
    }
    if (schema_prop !== 'object')
        return value_type === schema_prop;
    if (Object.prototype.toString.call(schema_prop) === '[object Array]')
    {
        return schema_prop.includes(value);
    }
}

export const setData = (update, options = {reload: true}, store_iter = store, schema_iter = schema) => {
    if (typeof update !== 'object')
    {
        console.error("Cannot update state with value: ", update);
    }

    for (const prop in update)
    {
        if (!prop in schema_iter)
        {
            return console.error(`${prop} in not a valid key for `, schema_iter);
        }
        if (typeof update[prop] === 'object' && schema_iter[prop] !== 'array')
        {
            if (!store_iter[prop])
                store_iter[prop] = {}
            setData(
                update[prop],
                Object.assign({}, options, {reload: false}),
                store_iter[prop],
                schema_iter[prop]
            );
        }
        else if (isValid(prop, update[prop], schema_iter[prop]))
        {
            store_iter[prop] = update[prop];
            console.log(`Set ${prop} to ${update[prop]}`);
        }
        else
        {
            console.error(`Expected type ${typeof schema_iter[prop]}, got ${typeof update[prop]}`);
        }
    }

    if (options.reload === true)
        loadPage(store.route.path);
}

export const getData = (path) => {
    const keys = path.split('.');

    let current = store;
    let not_found = false;
    keys.forEach(k => {
        if (not_found)
            return ;
        if (typeof current[k] === 'undefined')
        {
            console.error(`Didn't find ${k} in `, current);
            not_found = true;
            return undefined;
        }
        console.log(current);
        current = current[k];
    });
    return not_found ? null : current;
}