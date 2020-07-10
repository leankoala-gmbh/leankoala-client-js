const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient('stage')
    await client.connect({ username: 'demo', password: 'demo', 'withMemories': true })

    const user = client.getUser()
    console.log('User:', user)

    /** @var ProjectRepository projectRepo **/
    const projects = await client.getRepository('project').search({ user: user.id })

    console.log('Projects:', projects)

  } catch (e) {
    console.error(e.message)
  }
})()
