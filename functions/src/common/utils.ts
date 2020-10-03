import * as functions from "firebase-functions";
export const functionConfig = () => {
    if (process.env.RUN_LOCALLY) {
        const fs = require('fs');
        return JSON.parse(fs.readFileSync('env.json'));
    } else {
        return functions.config();
    }
};
