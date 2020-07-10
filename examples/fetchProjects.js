const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient('stage')
    client.connect({ username: 'demo', password: 'demo', 'withMemories': true })



    // geht
    const repo = await client.getRepository('project')

    const user = client.getUser()
    console.log('User:', user)

    const projects = await repo.search({ user: user.id })

    console.log('Projects:', projects)

  } catch (e) {
    console.error(e.message)
  }
})()
