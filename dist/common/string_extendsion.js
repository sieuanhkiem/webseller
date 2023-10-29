"use strict";
String.prototype.formart = function (...arg) {
    return this.replace(/\{\d{1}\}/g, function (math, number) {
        let index = parseInt(math.replace('{', '').replace('}', ''));
        console.log(arg[index]);
        console.log(arg[number]);
        return arg[index];
    });
};
