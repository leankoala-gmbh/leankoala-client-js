const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class ScoreRepository extends Repository {

  /**
   * Return a list of scores by the given score names for all projects and systems the user is part of.
   *
   * @param user
   * @param {Object} args
   * @param {Array} args.scores List of score names
   * @param {Boolean} args.with_sub_scores NOT IMPLEMENTED YET: If true detailed information about the
   *                                       score will be provided. (default: false)
   */
  async getScoresByUser(user, args) {
    const route = { path: 'score/scores/user/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['scores']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return the score for a given score name.
   *
   * @param system
   * @param scoreName
   * @param {Object} args
   */
  async getScore(system, scoreName, args) {
    const route = { path: 'score/scores/{system}/{scoreName}', method: 'POST', version: 1 }
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
    const route = { path: 'score/scores/{system}', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['scores']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = ScoreRepository
