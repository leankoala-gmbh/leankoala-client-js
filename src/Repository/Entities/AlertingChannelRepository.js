const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class AlertingChannelRepository extends Repository {

  /**
   * List all channels for the given project
   *
   * @param project
   * @param {Object} args
   */
  async list(project, args) {
    const route = { path: 'alerting/channels/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * @param project
   * @param {Object} args
   * @param {String} args.name 
   * @param {*} args.type 
   * @param {Array} args.options 
   */
  async create(project, args) {
    const route = { path: 'alerting/channels/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name', 'type', 'options']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete the given channel
   *
   * @param project
   * @param channel
   * @param {Object} args
   */
  async delete(project, channel, args) {
    const route = { path: 'alerting/channels/{project}/{channel}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project, channel }, args)

    return this._connection.send(route, argList)
  }

  /**
   * @param project
   * @param channel
   * @param {Object} args
   * @param {String} args.name  (optional)
   * @param {*} args.type  (optional)
   * @param {Array} args.options  (optional)
   */
  async update(project, channel, args) {
    const route = { path: 'alerting/channels/{project}/{channel}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, channel }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = AlertingChannelRepository
