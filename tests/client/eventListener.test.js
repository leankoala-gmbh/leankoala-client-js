const LeankoalaClient = require('../../src/Client')
const axios = require('axios')

test('Check if the events are published', async () => {

  const client = new LeankoalaClient('stage')

  await client.connect({ username: 'demo', password: 'demo', axios })

  client.on('send', function (payload) {
    console.log('a request was send')
    console.log(payload)
  })

  const user = client.getUser()

  client.setLanguage('de')

  /** @var {ProjectRepository} projectRepo **/
  const projectRepo = await client.getRepository('project')
  const projects = await projectRepo.search({ user: user.id })

  const project = projects[ 'projects' ].pop()

  /** @var {IncidentRepository} incidentRepo **/
  const incidentRepo = await client.getRepository('incident')
  const incidentsDe = await incidentRepo.search(project.id)

  expect(incidentsDe[ 'incidents' ].length).toBeGreaterThan(0)
  expect(incidentsDe[ 'incidents' ].pop().message).toContain('tote Links')

  client.setLanguage('en')
  const incidentsEn = await incidentRepo.search(project.id)

  expect(incidentsEn[ 'incidents' ].length).toBeGreaterThan(0)
  expect(incidentsEn[ 'incidents' ].pop().message).toContain('dead')

})
