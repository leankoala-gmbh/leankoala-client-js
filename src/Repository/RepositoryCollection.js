const AlertingChannel = require('./Entities/AlertingChannelRepository')
const AlertingPolicy = require('./Entities/AlertingPolicyRepository')
const CheckBrokenResource = require('./Entities/CheckBrokenResourceRepository')
const CheckCertificate = require('./Entities/CheckCertificateRepository')
const CheckCookie = require('./Entities/CheckCookieRepository')
const CheckDeadLinks = require('./Entities/CheckDeadLinksRepository')
const CheckFileSize = require('./Entities/CheckFileSizeRepository')
const CheckJavaScriptErrors = require('./Entities/CheckJavaScriptErrorsRepository')
const CheckLighthouse = require('./Entities/CheckLighthouseRepository')
const CheckMobileFriendly = require('./Entities/CheckMobileFriendlyRepository')
const Check = require('./Entities/CheckRepository')
const CheckSitemap = require('./Entities/CheckSitemapRepository')
const Company = require('./Entities/CompanyRepository')
const Crawler = require('./Entities/CrawlerRepository')
const CustomerHaendlerbundMetric = require('./Entities/CustomerHaendlerbundMetricRepository')
const CustomerHaendlerbund = require('./Entities/CustomerHaendlerbundRepository')
const CustomMehrwertSteuercheck = require('./Entities/CustomerMehrwertsteuercheckRepository.js')
const Incident = require('./Entities/IncidentRepository')
const Memory = require('./Entities/MemoryRepository')
const Metric = require('./Entities/MetricRepository')
const Project = require('./Entities/ProjectRepository')
const Score = require('./Entities/ScoreRepository')
const Screenshot = require('./Entities/ScreenshotRepository')
const System = require('./Entities/SystemRepository')
const Tool = require('./Entities/ToolRepository')
const User = require('./Entities/UserRepository')
const Websocket = require('./Entities/WebsocketRepository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-20
 */
class RepositoryCollection {

  constructor(connection) {

    this._repositories = {}
    this._repositories['alertingchannel'] = new AlertingChannel(connection)
    this._repositories['alertingpolicy'] = new AlertingPolicy(connection)
    this._repositories['customerHaendlerbundMetric'] = new CustomerHaendlerbundMetric(connection)
    this._repositories['customerHaendlerbund'] = new CustomerHaendlerbund(connection)
    this._repositories['custommehrwertsteuercheck'] = new CustomMehrwertSteuercheck(connection)
    this._repositories[ 'crawler' ] = new Crawler(connection)
    this._repositories[ 'memory' ] = new Memory(connection)
    this._repositories[ 'score' ] = new Score(connection)
    this._repositories[ 'websocket' ] = new Websocket(connection)
    this._repositories[ 'metric' ] = new Metric(connection)
    this._repositories[ 'user' ] = new User(connection)
    this._repositories[ 'company' ] = new Company(connection)
    this._repositories[ 'project' ] = new Project(connection)
    this._repositories[ 'system' ] = new System(connection)
    this._repositories[ 'screenshot' ] = new Screenshot(connection)
    this._repositories[ 'tool' ] = new Tool(connection)
    this._repositories[ 'check' ] = new Check(connection)
    this._repositories[ 'checklighthouse' ] = new CheckLighthouse(connection)
    this._repositories[ 'checkdeadlinks' ] = new CheckDeadLinks(connection)
    this._repositories[ 'checkbrokenresource' ] = new CheckBrokenResource(connection)
    this._repositories[ 'checkjavascripterrors' ] = new CheckJavaScriptErrors(connection)
    this._repositories[ 'checkfilesize' ] = new CheckFileSize(connection)
    this._repositories[ 'checksitemap' ] = new CheckSitemap(connection)
    this._repositories[ 'checkmobilefriendly' ] = new CheckMobileFriendly(connection)
    this._repositories[ 'checkcertificate' ] = new CheckCertificate(connection)
    this._repositories[ 'checkcookie' ] = new CheckCookie(connection)
    this._repositories[ 'incident' ] = new Incident(connection)
  }

  getRepository(entityType) {

    const repositoryName = entityType.toLowerCase()
    if (this._repositories.hasOwnProperty(repositoryName)) {
      return this._repositories[ repositoryName ]
    } else {
      throw new Error('No repository with name ' + repositoryName + ' found. Registered repositories are: ' + JSON.stringify(Object.keys(this._repositories)))
    }

  }
}

module.exports = RepositoryCollection
