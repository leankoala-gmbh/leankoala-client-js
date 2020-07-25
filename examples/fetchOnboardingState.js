const LeankoalaClient = require('../src/Client')
const axios = require('axios');

(async () => {
  try {

    const client = new LeankoalaClient()
    await client.connect({ username: 'demo', password: 'demo', axios })
    const user = client.getUser()

    const projects = await client.getRepository('project').search({ user: user.id })

    const project = projects[ 'projects' ].pop()

    const status = await client.getRepository('project').getStatus(project.id)

    console.log(status)

  } catch (e) {
    console.error(e.message)
  }
})()
