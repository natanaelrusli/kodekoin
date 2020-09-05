const Xendit = require("xendit-node");
// const dotenv = require("dotenv");

// dotenv.config();

const x = new Xendit({
    secretKey:
        "xnd_production_0CPZmueeRrH9qKmDt4szoVGC2nbrx18tAo9NSp8rTzoYmj5aTJ3QAQPMUyAGtcrI"
    // xnd_production_0CPZmueeRrH9qKmDt4szoVGC2nbrx18tAo9NSp8rTzoYmj5aTJ3QAQPMUyAGtcrI production
    // xnd_development_3fDDRpdkP1kPKBqi5MQRq8QXatVw8tOqyuBdTOE8tqvKt7oVNVoFwTUYkZWZhwD develop
});

module.exports = x;
