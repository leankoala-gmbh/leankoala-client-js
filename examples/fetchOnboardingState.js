const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
    try {

        const client = new LeankoalaClient('local')
        await client.connect({username: 'nils', password: 'nils', axios, autoSelectCompany: true})
        const user = client.getUser()

        const repo = await client.getRepository('project')
        const projects = await repo.search({user: user.id})

        const project = projects['projects'].pop()

        const status = await repo.getStatus(project.id)

        console.log(status)

    } catch (e) {
        console.error(e.message)
    }
})()
