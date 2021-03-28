const LeankoalaClient = require('../src/Client')
const axios = require('axios');

const cliArgs = process.argv;

const username = cliArgs[2]
const password = cliArgs[3]
const email = cliArgs[5]
const environment = cliArgs[4];

(async () => {
    try {
        const client = new LeankoalaClient(environment)
        client.on('response', function (payload) { console.log(payload)})
        client.on('failure', function (payload) { console.log(payload)})
        await client.connect({username, password, axios})
        const userRepo = await client.getRepository('user')
        await userRepo.deleteByEmail({email})
    } catch (e) {
        console.error(e.message)
    }
})()
