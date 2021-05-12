const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
    try {

        const client = new LeankoalaClient('local')

        await client.connect({username: 'nils', password: 'nils', axios, autoSelectCompany: true})

        const repo = await client.getRepository('websocket')
        const rooms = await repo.getRooms()

        console.log(rooms)

    } catch (e) {
        console.log(e)
        console.error(e.message)
    }
})()
