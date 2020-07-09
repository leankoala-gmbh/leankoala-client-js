const assertValidArguments = require('../utils/assertValidArguments')
/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class ScoreRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * @param system
   * @param scoreName
   */
   async getScore(system, scoreName, args) {
    const route = {
      path: 'score/scores/{system}/{scoreName}',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ system, scoreName }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of scores by the given score names.
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.scores list of score names
   */
   async getScores(system, args) {
    const route = {
      path: 'score/scores/{system}',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    // validate arguments
    const requiredArguments = ['scores']
    assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }
}

module.exports = ScoreRepository
