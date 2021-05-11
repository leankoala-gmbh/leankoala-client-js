const Marketplace = require('./Entities/MarketplaceRepository')
const Subscription = require('./Entities/SubscriptionRepository')
const Crawler = require('./Entities/CrawlerRepository')
const CustomerHaendlerbund = require('./Entities/CustomerHaendlerbundRepository')
const CustomerHaendlerbundMetric = require('./Entities/CustomerHaendlerbundMetricRepository')
const CustomerMehrwertsteuercheck = require('./Entities/CustomerMehrwertsteuercheckRepository')
const Memory = require('./Entities/MemoryRepository')
const Score = require('./Entities/ScoreRepository')
const AlertingPolicy = require('./Entities/AlertingPolicyRepository')
const AlertingChannel = require('./Entities/AlertingChannelRepository')
const Websocket = require('./Entities/WebsocketRepository')
const Metric = require('./Entities/MetricRepository')
const Auth = require('./Entities/AuthRepository')
const User = require('./Entities/UserRepository')
const Invitation = require('./Entities/InvitationRepository')
const Company = require('./Entities/CompanyRepository')
const Component = require('./Entities/ComponentRepository')
const Project = require('./Entities/ProjectRepository')
const System = require('./Entities/SystemRepository')
const Screenshot = require('./Entities/ScreenshotRepository')
const Tool = require('./Entities/ToolRepository')
const Check = require('./Entities/CheckRepository')
const CheckLighthouse = require('./Entities/CheckLighthouseRepository')
const CheckA11y = require('./Entities/CheckA11yRepository')
const CheckBrokenResource = require('./Entities/CheckBrokenResourceRepository')
const CheckJavaScriptErrors = require('./Entities/CheckJavaScriptErrorsRepository')
const CheckFileSize = require('./Entities/CheckFileSizeRepository')
const CheckSitemap = require('./Entities/CheckSitemapRepository')
const CheckMobileFriendly = require('./Entities/CheckMobileFriendlyRepository')
const CheckCertificate = require('./Entities/CheckCertificateRepository')
const CheckInsecureContent = require('./Entities/CheckInsecureContentRepository')
const CheckCookie = require('./Entities/CheckCookieRepository')
const CheckDeadLinks = require('./Entities/CheckDeadLinksRepository')
const CheckHealthCheck = require('./Entities/CheckHealthCheckRepository')
const Incident = require('./Entities/IncidentRepository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class RepositoryCollection {

  constructor() {
    this._masterConnection = false
    this._clusterConnection = false

    this._repositories = {}
    this._repositories[ 'marketplace' ] = new Marketplace()
    this._repositories[ 'subscription' ] = new Subscription()
    this._repositories[ 'crawler' ] = new Crawler()
    this._repositories[ 'customerhaendlerbund' ] = new CustomerHaendlerbund()
    this._repositories[ 'customerhaendlerbundmetric' ] = new CustomerHaendlerbundMetric()
    this._repositories[ 'customermehrwertsteuercheck' ] = new CustomerMehrwertsteuercheck()
    this._repositories[ 'memory' ] = new Memory()
    this._repositories[ 'score' ] = new Score()
    this._repositories[ 'alertingpolicy' ] = new AlertingPolicy()
    this._repositories[ 'alertingchannel' ] = new AlertingChannel()
    this._repositories[ 'websocket' ] = new Websocket()
    this._repositories[ 'metric' ] = new Metric()
    this._repositories[ 'auth' ] = new Auth()
    this._repositories[ 'user' ] = new User()
    this._repositories[ 'invitation' ] = new Invitation()
    this._repositories[ 'company' ] = new Company()
    this._repositories[ 'component' ] = new Component()
    this._repositories[ 'project' ] = new Project()
    this._repositories[ 'system' ] = new System()
    this._repositories[ 'screenshot' ] = new Screenshot()
    this._repositories[ 'tool' ] = new Tool()
    this._repositories[ 'check' ] = new Check()
    this._repositories[ 'checklighthouse' ] = new CheckLighthouse()
    this._repositories[ 'checka11y' ] = new CheckA11y()
    this._repositories[ 'checkbrokenresource' ] = new CheckBrokenResource()
    this._repositories[ 'checkjavascripterrors' ] = new CheckJavaScriptErrors()
    this._repositories[ 'checkfilesize' ] = new CheckFileSize()
    this._repositories[ 'checksitemap' ] = new CheckSitemap()
    this._repositories[ 'checkmobilefriendly' ] = new CheckMobileFriendly()
    this._repositories[ 'checkcertificate' ] = new CheckCertificate()
    this._repositories[ 'checkinsecurecontent' ] = new CheckInsecureContent()
    this._repositories[ 'checkcookie' ] = new CheckCookie()
    this._repositories[ 'checkdeadlinks' ] = new CheckDeadLinks()
    this._repositories[ 'checkhealthcheck' ] = new CheckHealthCheck()
    this._repositories[ 'incident' ] = new Incident()
  }

  setClusterConnection(connection) {
    this._clusterConnection = connection
  }

  setMasterConnection(connection) {
    this._masterConnection = connection
  }

  getRepository(entityType) {
    const repositoryName = entityType.toLowerCase()
    if (this._repositories.hasOwnProperty(repositoryName)) {
      const repo = this._repositories[repositoryName]
      if (repo.getConnectionType() === 'ClusterConnection') {
        repo.setConnection(this._clusterConnection)
      } else {
        repo.setConnection(this._masterConnection)
      }
      return this._repositories[repositoryName]
    } else {
      throw new Error('No repository with name ' + repositoryName + ' found. Registered repositories are: ' + JSON.stringify(Object.keys(this._repositories)))
    }
  }
}

module.exports = RepositoryCollection
