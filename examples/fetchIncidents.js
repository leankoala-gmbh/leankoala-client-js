const LeankoalaClient = require('../src/Client');
const axios = require('axios');

(async () => {
    try {

        const client = new LeankoalaClient('local')
        await client.connect({username: 'nils', password: 'nils', language: 'de', axios, autoSelectCompany: true})
        const user = client.getUser()

        client.on('send', function (payload) {
            console.log(payload)
        })

        client.setLanguage('de')

        /** @var {ProjectRepository} projectRepo **/
        const projectRepo = await client.getRepository('project')
        const projects = await projectRepo.search({user: user.id})

        const project = projects['projects'].pop()

        /** @var {IncidentRepository} incidentRepo **/
        const incidentRepo = await client.getRepository('incident')
        const incidents = await incidentRepo.search(project.id)

       // console.log(incidents)

    } catch (e) {
        console.log(e)
        console.error(e.message)
    }
})()
