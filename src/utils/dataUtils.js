function camelToSnakeCase(object) {
    let newObject = {};
    Object.keys(object).forEach((key) => {
        let newKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        if (Array.isArray(object[key])) {
            newObject[newKey] = object[key]
            return
        }
        if (typeof object[key] === 'object' && object[key] !== null) {
            newObject[newKey] = camelToSnakeCase(object[key]);
        } else {
            newObject[newKey] = object[key];
        }
    });
    return newObject;
}

function snakeToCamelCase(object) {
    let newObject = {};
    let newKey;
    Object.keys(object).forEach((key) => {
        if (key === '_id') {
            newKey = key;
            newObject[newKey] = object[key];
        } else {
            newKey = key?.replace(/(_\w)/g, (k) => k[1].toUpperCase());
            if (Array.isArray(object[key])) {
                newObject[newKey] = object[key]
                return
            }
            if (typeof object[key] === 'object' && object[key] !== null) {
                newObject[newKey] = snakeToCamelCase(object[key]);
            } else {
                newObject[newKey] = object[key];
            }
        }
    });
    return newObject;
}

console.log(
    snakeToCamelCase({
        _id: '63f5b910efba559db4c36501',
        username: 'linhdv71111',
        user_info: {
            full_name: 'sadsad',
            staff_position: '123213',
            email: 'vandoan1029i@gmail.com',
            phone_number: '0964708429'
        },
        created: '2023-02-22T04:48:53.341Z',
        role: 'admin'
    })
);

function removeNullOrUndefined(obj){
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v!=='' ));
}

export default {
    camelToSnakeCase: camelToSnakeCase,
    snakeToCamelCase: snakeToCamelCase,
    removeNullOrUndefined:removeNullOrUndefined
};
