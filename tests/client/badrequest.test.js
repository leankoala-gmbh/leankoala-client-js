const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios')
const BadRequestError = require('../../src/Connection/BadRequestError')

test('Check if client handles bad requests correctly', async () => {

  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo', axios })

  const repo = await client.getRepository('project')

  try {
  await repo.search({user: "this is not a user id"})
  }catch (error) {
    if (error instanceof BadRequestError) {
      expect(error.message).toContain('with id')
      expect(error.url).toContain('project/projects/search')
      expect(error.data.user).toContain('is not')
    }else{
      expect(true).toBeFalsy()
    }
  }

})

