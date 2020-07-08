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

  } catch (e) {
    throw e
    console.error(e.message)
  }
})()
