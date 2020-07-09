const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient('stage')
    await client.connect({ username: 'demo', password: 'demo' })
    const user = client.getUser()

    /** @var ProjectRepository projectRepo **/
    const rooms = await client.getRepository('websocket').getRoom()

    console.log(rooms)

  } catch (e) {
    console.error(e.message)
  }
})()
