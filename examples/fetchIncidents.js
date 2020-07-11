const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient()
    await client.connect({ username: 'demo', password: 'demo', language: 'de' })
    const user = client.getUser()

    client.setLanguage('de')

    /** @var {ProjectRepository} projectRepo **/
    const projectRepo = await client.getRepository('project')
    const projects = await projectRepo.search({user: user.id})

    const project = projects['projects'].pop()

    /** @var {IncidentRepository} incidentRepo **/
    const incidentRepo = await client.getRepository('incident')
    const incidents = await incidentRepo.search(project.id)

    console.log(incidents)

  } catch (e) {
    console.error(e.message)
  }
})()
