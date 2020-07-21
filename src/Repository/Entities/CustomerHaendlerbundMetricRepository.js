const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-21
 */
class CustomerHaendlerbundMetricRepository extends Repository {

  /**
   * Search for the metrics for all eventIdentifiers in the given projects that are defined by the given
   * tool.
   *
   * @param system
   * @param {Object} args
   * @param {*} args.tool A single tool id or the identifier of a tool.
   * @param {Array} args.tools A list of tool ids. For every tool there will be a metric array returned.
   * @param {*} args.metric_type The engine stores to kinds of metrics. Status and Value. The status
   *                                 is the ratio between successful checks and failed in percent, the
   *                                 value is the average value of the checks result.
   * @param {Boolean} args.filter_trailing_nulls Remove null values from the metric if they are at the
   *                                             beginning. Trailing nulls are used of the metric does
   *                                             not provide values for a given time spam.
   * @param {Number} args.min_value Replace all values that are smaller than the min value with the min
   *                                 value.
   */
  async findBySystem(system, args) {
    const route = { path: 'customers/haendlerbund/metrics/{system}', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CustomerHaendlerbundMetricRepository
