const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient()
    await client.connect({ username: 'demo', password: 'demo' })
    const user = client.getUser()

    const projects = await client.getRepository('project').search({user: user.id})

    const project = projects['projects'].pop()

    /** @var ProjectRepository projectRepo **/
    const status = await client.getRepository('project').getStatus(19)

    console.log(status)

  } catch (e) {
    throw e
    console.error(e.message)
  }
})()
