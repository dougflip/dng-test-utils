const isFunction = window.angular.isFunction;

function buildInstance(obj){
    obj = Array.isArray(obj) ? obj[obj.length - 1] : obj;
    return (obj.constructor === Function) ? new obj() : obj;
}

function createDefaultValue(obj, key){
    if(isFunction(obj)) return jasmine.createSpy(key);

    return (Array.isArray(obj)) ? [] : null;
}

export default (obj) => {
    var mock = {};
    var instance = buildInstance(obj);
    for(var key in instance){
        mock[key] = createDefaultValue(instance[key], key);
    }
    return mock;
}
