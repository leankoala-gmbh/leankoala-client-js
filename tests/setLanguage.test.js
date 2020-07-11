const LeankoalaClient = require('../src/Client')

test('Check if incidents are returned in german', async () => {

  const client = new LeankoalaClient()
  await client.connect({ username: 'demo', password: 'demo' })
  const user = client.getUser()

  client.setLanguage('de')

  /** @var {ProjectRepository} projectRepo **/
  const projectRepo = await client.getRepository('project')
  const projects = await projectRepo.search({ user: user.id })

  const project = projects[ 'projects' ].pop()

  /** @var {IncidentRepository} incidentRepo **/
  const incidentRepo = await client.getRepository('incident')
  const incidents = await incidentRepo.search(project.id)

  expect(incidents[ 'incidents' ].length).toBeGreaterThan(0)
  expect(incidents[ 'incidents' ].pop().message).toContain('tote Links')
})
