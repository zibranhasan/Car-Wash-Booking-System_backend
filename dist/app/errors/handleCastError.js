"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorMessage: `${err.value} is not a valid ID!`,
        errorDetails: Object.assign(Object.assign({}, err), { name: "CastError", issues: errorSources }),
    };
};
exports.default = handleCastError;
