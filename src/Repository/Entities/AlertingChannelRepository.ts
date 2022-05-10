import Repository from '../Repository'
import {
  IAlertResponseUpdate,
  IRAlertCreate,
  IRAlertResponseCreate,
  IRAlertResponseList, IRAlertUpdate
} from '../../typescript/interfaces/repos/alertingChannelRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class AlertingChannelRepository extends Repository {

  constructor() {
    super()
    this._connectionType = 'ClusterConnection'
  }

  /**
   * List all channels for the given project.
   *
   * request url: /kapi/v1/alerting/channels/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async list(project: string, args = {}): Promise<IRAlertResponseList> {
    const route = { path: 'alerting/channels/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Create a new notification channel. At the moment only e-mail is provided.
   *
   * request url: /kapi/v1/alerting/channels/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name The name of the alert channel
   * @param {*} args.type
   * @param {Array} args.options
   * @param {String} args.language The language the alert should be send in. If not value is set the
   *                               default provider language is taken. (optional)
   */
  async create(project: string, args: IRAlertCreate): Promise<IRAlertResponseCreate> {
    const route = { path: 'alerting/channels/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name', 'type', 'options']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete the given channel.
   *
   * request url: /kapi/v1/alerting/channels/{project}/{channel}
   * request method: DELETE
   *
   * @param project
   * @param channel
   * @param {Object} args
   */
  async delete(project: string, channel: number, args = {}): Promise<void> {
    const route = { path: 'alerting/channels/{project}/{channel}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project, channel }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Update an existing notification channel.
   *
   * request url: /kapi/v1/alerting/channels/{project}/{channel}
   * request method: PUT
   *
   * @param project
   * @param channel
   * @param {Object} args
   * @param {String} args.name  (optional)
   * @param {*} args.type
   * @param {Array} args.options  (optional)
   * @param {String} args.language The language the alert should be send in (optional)
   */
  async update(project: string, channel: number, args: IRAlertUpdate): Promise<IAlertResponseUpdate> {
    const route = { path: 'alerting/channels/{project}/{channel}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, channel }, args)
    const requiredArguments = ['type']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }
}

export default AlertingChannelRepository
