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
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   *
   * @todo this should be done in a parent class
   */
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function (argument) {
      if (!actualArguments.hasOwnProperty(argument)) {
        throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
      }
    })
  }
}

module.exports = ScoreRepository
