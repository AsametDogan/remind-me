"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validation {
}
Validation.email = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
exports.default = Validation;
