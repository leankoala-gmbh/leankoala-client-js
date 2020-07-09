/**
 * Throw an exception if a mandatory argument is not set.
 *
 * @param requiredArguments
 * @param actualArguments
 * @private
 *
 */
const assertValidArguments = (requiredArguments, actualArguments) => {
  requiredArguments.forEach((argument) => {
    if (!actualArguments.hasOwnProperty(argument)) {
      throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
    }
  })
}

module.exports = assertValidArguments
