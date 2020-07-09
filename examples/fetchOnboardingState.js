const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient()
    await client.connect({ username: 'demo', password: 'demo' })
    const user = client.getUser()

    const projects = await client.getRepository('project').find({user: user.id})

    const project = projects['projects'].pop()

    /** @var ProjectRepository projectRepo **/
    const incidents = await client.getRepository('project').getStatus(project.id)

    console.log(incidents)

  } catch (e) {
    console.error(e.message)
  }
})()
