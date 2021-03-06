const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
  try {

    const client = new LeankoalaClient('stage')
    await client.connect({ username: 'demo', password: 'demo', 'withMemories': true, axios })

    const repo = await client.getRepository('project')
    const user = client.getUser()

    const projects = await repo.search({ user: user.id })

    console.log('Projects:', projects)

  } catch (e) {
    console.error(e.message)
  }
})()
