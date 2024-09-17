"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Standardization {
    static trim(str) {
        var _a;
        return (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    }
    static phone(str) {
        var _a, _b, _c;
        return (_c = (_b = (_a = str === null || str === void 0 ? void 0 : str.replace(/[^0-9]/g, '')) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '')) === null || _b === void 0 ? void 0 : _b.slice(-10)) === null || _c === void 0 ? void 0 : _c.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }
    static capitalizeFirst(str) {
        var _a;
        str = (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.default = Standardization;
