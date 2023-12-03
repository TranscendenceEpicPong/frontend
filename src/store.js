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
        mode: ['solo', 'duel', 'tournament']
    }
};

const isValid = (prop, value, schema_prop) => {
    const value_type = typeof value;
    const schema_type = typeof schema_prop;
    if (schema_type === 'object' && Object.prototype.toString.call(schema_type) === '[object Array]')
    {
        return schema_prop.includes(value);
    }
    return value_type === schema_type;
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
        if (typeof update[prop] === 'object')
        {
            return setData(
                update[prop],
                Object.assign({}, options, {reload: false}),
                store[prop],
                update[prop]
            );
        }
        if (isValid(prop, update[prop], schema_iter[prop]))
        {
            store_iter[prop] = update[prop];
            console.log(`Set ${prop} to ${update[prop]}`);
        }
        else
        {
            return console.error(`Expected type ${typeof schema_iter[prop]}, got ${typeof update[prop]}`);
        }
    }

    if (options.reload === true && store_iter === store)
        loadPage(store.route.path);
}

export const getData = (path) => {
    const keys = path.split('.');

    let current = store;
    keys.forEach(k => {
        if (typeof current[k] === 'undefined')
        {
            console.error(`Didn't find ${k} in `, current);
            return undefined;
        }
        current = current[k];
    });
    console.log(current);
    return current;
}