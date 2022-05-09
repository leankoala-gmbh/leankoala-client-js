[![Actions Status](https://github.com/leankoala-gmbh/leankoala-client-js/workflows/Run%20JEST%20tests/badge.svg)](https://github.com/leankoala-gmbh/leankoala-client-js/actions?query=workflow%3A%22Run+JEST+tests%22) [![DeepScan grade](https://deepscan.io/api/teams/10108/projects/12794/branches/203150/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10108&pid=12794&bid=203150)

# KoalityEngine JavaScript Client

The library is used to communicate with the KoalityEngine. 

Please contact `api@koalityengine.com` if you want to use the API.

## Multi language support
The KoalityEngine API can return the results in different languages. The preferred language can be defined in the
connect argument or later on via the `setLanguage` method.

```javascript
await client.connect({ username: 'demo', password: 'demo', language: 'de' })
// or
client.setLanguage('de')
```

## Connect
```javascript
// via username and password
await client.connect({ username: 'demo', password: 'demo', axios })

# via wakeup token
await client.connect({ wakeUpToken, axios })

# via refresh token
await client.connect({ refreshToken, userId, axios })
```

## Examples
This example returns a list of projects the user `demo` is part of.
```javascript
const LeankoalaClient = require('../src/Client');
const axios = require('axios');

(async () => {
    const client = new LeankoalaClient('stage')
    await client.connect({ username: 'demo', password: 'demo', axios })

    const user = client.getUser()

    const projectRepository = await client.getRepository('project')
    const projects = await projectRepository.search({ user: user.id })

    console.log('Projects:', projects)
})()

```
More examples can be found in the `examples` directory. A good idea could also be having a look at 
the test cases in the `tests` directory.

## Testing
- [How to test the client](tests/readme.md)
