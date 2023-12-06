import {loadPage} from "./router.js";
import {isArray, isObject} from "./utils.js";

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
    if (schema_prop === 'array' && isArray(value))
        return true;
    if (schema_prop === 'object' && isObject(value))
        return true;
    if (isArray(schema_prop))
        return schema_prop.includes(value);
    return value_type === schema_prop;
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
            if (schema_iter[prop] === 'array')
                store_iter[prop] = [...store_iter[prop] || [], update[prop]]
            else
                store_iter[prop] = update[prop];
            console.log(`Set ${prop} to `, update[prop]);
        }
        else
        {
            console.error(`Expected type ${typeof schema_iter[prop]}, got ${typeof update[prop]}`);
        }
    }

    if (options.reload === true)
        loadPage(store.route.path);

    if (!window.store)
        window.store = {};
    Object.assign(window.store, store);
}

export const getData = (path) => {
    const keys = path.split('.');

    let current = store;
    let schema_iter = schema;
    keys.forEach(k => {
        console.log(k);
        if (typeof current[k] === 'undefined')
        {
            if (typeof schema_iter[k] === 'undefined')
            {
                console.error(`Didn't find ${k} in `, current);
                return undefined;
            }

            if (isObject(schema_iter[k]))
                current[k] = {};
            else if (schema_iter[k] === 'array')
                current[k] = [];
        }
        console.log(current);
        current = current[k];
        schema_iter = schema_iter[k];
    });
    return current;
}