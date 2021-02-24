const LeankoalaClient = require('../src/Client')
const axios = require('axios');

const cliArgs = process.argv;

const username = cliArgs[2]
const password = cliArgs[3]
const email = cliArgs[4]
const environment = cliArgs[5] || 'stage';

(async () => {
    try {
        const client = new LeankoalaClient(environment)
        await client.connect({username, password, axios})
        const userRepo = await client.getRepository('user')
        await userRepo.deleteByEmail({email})
    } catch (e) {
        console.error(e.message)
    }
})()
