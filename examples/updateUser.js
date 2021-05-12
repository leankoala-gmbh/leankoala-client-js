const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
  try {

    const client = new LeankoalaClient('local')
    await client.connect({ username: 'nils', password: 'nils', 'withMemories': true, axios, autoSelectCompany: true })

    const repo = await client.getRepository('user')
    const user = client.getMasterUser()

    await repo.updateUser('koality', user.id, { userName: 'nils' })

  } catch (e) {
    console.log(e)
    console.error(e.message)
  }
})()
