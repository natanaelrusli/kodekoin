const Xendit = require("xendit-node");
// const dotenv = require("dotenv");

// dotenv.config();

const x = new Xendit({
    secretKey:
        "xnd_production_0CPZmueeRrH9qKmDt4szoVGC2nbrx18tAo9NSp8rTzoYmj5aTJ3QAQPMUyAGtcrI" //production
    // "eG5kX3Byb2R1Y3Rpb25fMENQWm11ZWVSckg5cUttRHQ0c3pvVkdDMm5icngxOHRBbzlOU3A4clR6b1ltajVhVEozUUFRUE1VeUFHdGNySTo="
    // xnd_development_3fDDRpdkP1kPKBqi5MQRq8QXatVw8tOqyuBdTOE8tqvKt7oVNVoFwTUYkZWZhwD develop
});

module.exports = x;
