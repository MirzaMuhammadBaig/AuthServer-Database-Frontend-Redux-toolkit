"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameString = exports.passWordString = exports.passCodeString = void 0;
function passCodeString() {
    const characters = "VTV8952DLBQ20JTX350XYCQQWL9S0Y5AS0JTX350XYCQQWL9S0Y5AS71MS9Z565O1FILR2A";
    let token = "";
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.passCodeString = passCodeString;
function passWordString() {
    const characters = "d7JL4Gz9^lERD%*zEzMRnaRkqs*MC$dFK$D%*zEzMRnaRkqs*MC$dFK$TFSLD!4BkOy58fYd";
    let token = "";
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.passWordString = passWordString;
function nameString() {
    const characters = "Gq07964hC3Iv0ws3sXPUf8Xapj2svrY2jQWD7M4LxaEBz1CIj2svrY2jQWD7M4LxaEBz1CIha";
    let token = "";
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.nameString = nameString;
