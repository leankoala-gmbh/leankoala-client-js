const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
  try {

    const client = new LeankoalaClient('local')
    await client.connect({ username: 'nils', password: 'nils', 'withMemories': true, axios, autoSelectCompany: true })

    const repo = await client.getRepository('project')
    const user = client.getUser()

    const projects = await repo.search({ user: user.id })

    console.log('Projects:', projects)

  } catch (e) {
    console.log(e)
    console.error(e.message)
  }
})()
