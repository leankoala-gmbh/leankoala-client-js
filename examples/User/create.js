const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios');

const cliArgs = process.argv;

const details = {
    email: 'nils.langner@webpros.com',
    userName: 'nils langner',
    password: '1234'
};

const accessToken = cliArgs[2];

(async () => {
    try {
        const client = new LeankoalaClient('stage')

        client.on('failure', function (payload) {
            console.log(payload)
        })

        await client.connect({accessToken, refreshToken: accessToken, axios})

        const userRepo = await client.getRepository('user')
        const createResult = await userRepo.createUser('koality', {
            email: 'nils.langner@webpros.com',
            userName: 'nils langner',
            password: '1234'
        }
    )

        console.log(createResult)
    } catch (e) {
        console.error(e.message)
    }
})()
