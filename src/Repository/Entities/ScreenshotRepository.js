const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class ScreenshotRepository extends Repository {

  /**
   * Return the screenshots for a single component.
   *
   * @param system
   * @param {Object} args
   */
  async getScreenshot(system, args) {
    const route = { path: 'project/screenshot/{system}', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the screenshots for all components in the given project.
   *
   * @param system
   * @param {Object} args
   */
  async getSystemScreenshots(system, args) {
    const route = { path: 'project/screenshots/{system}', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ScreenshotRepository
