const assertValidArguments = require('../utils/assertValidArguments')
/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class MetricRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * Search for the metrics for all eventIdentifiers in the given projects that are defined by the given tool.
   *
   * @param system
   * @param {Object} args
   * @param {*} args.tool
   * @param {Array} args.tools A list of tool ids. For every tool there will be a metric array returned.
   * @param {*} args.metric_type The engine stores to kinds of metrics. Status and Value. The status is the ratio between successful checks and failed in percent, the value is the average value of the checks result.
   * @param {Boolean} args.filter_trailing_nulls Remove null values from the metric if they are at the beginning. Trailing nulls are used of the metric does not provide values for a given time spam.
   * @param {*} args.min_value Replace all values that are smaller than the min value with the min value.
   */
   async findBySystem(system, args) {
    const route = {
      path: 'metric/eventidentifier/{system}/search',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }
}

module.exports = MetricRepository
