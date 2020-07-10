const LeankoalaClient = require('../src/Client');

(async () => {
  try {

    const client = new LeankoalaClient('stage')

    console.log(client.isConnected())

    await client.connect({ username: 'demo', password: 'demo' })

    console.log(client.isConnected())

    const rooms = await client.getRepository('websocket').getRooms()

    console.log(rooms)

  } catch (e) {
    console.error(e.message)
  }
})()
