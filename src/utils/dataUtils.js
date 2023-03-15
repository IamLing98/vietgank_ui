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

function snakeToCamelCaseWithArray(arr) {
    let result = []
    for (const item of arr) {
        result.push(snakeToCamelCase(item))
    }
    return result
}

function camelToSnakeCaseWithArray(arr) {
    let result = []
    for (const item of arr) {
        result.push(camelToSnakeCase(item))
    }
    return result
}

function removeNullOrUndefined(obj){
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => {
        if (Array.isArray(v)) {
            return v.length
        } 
        return v != null || v != ''
    } ));
}

function removeEmptyList(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => {
        if (Array.isArray(v)) {
            return v.length
        } else {
            return true
        }
    }));
}

export default {
    camelToSnakeCase: camelToSnakeCase,
    snakeToCamelCase: snakeToCamelCase,
    removeNullOrUndefined:removeNullOrUndefined,
    removeEmptyList,
    snakeToCamelCaseWithArray,
    camelToSnakeCaseWithArray
};
