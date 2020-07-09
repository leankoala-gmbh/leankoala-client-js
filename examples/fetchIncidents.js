const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient()
    await client.connect({ username: 'demo', password: 'demo' })
    const user = client.getUser()

    /** @var ProjectRepository projectRepo **/
    const projectRepo = client.getRepository('project')
    const projects = await projectRepo.find({ user: user.id })

    console.log(projects)
    console.log(client.getWakeUpToken())

    const client2 = new LeankoalaClient()
    await client2.connect({ wakeUpToken: client.getWakeUpToken() })

    const projects2 = await projectRepo.find({ user: user.id })

    console.log(projects2)

    console.log(client.isConnected())
    console.log(client2.isConnected())

  } catch (e) {
    throw e
    console.error(e.message)
  }
})()
