import {TRepositories} from '../typescript/interfaces/global/repos'
import {IRepositoryCollectionRepos} from '../typescript/interfaces/360ApiClient.interface'
// import Sequence from './Entities/SequenceRepository'
// import Marketplace from './Entities/MarketplaceRepository'
import Subscription from './Entities/SubscriptionRepository'
import Websocket from './Entities/WebsocketRepository'

// import Incident from './Entities/IncidentRepository'
// import CustomerHaendlerbund from './Entities/CustomerHaendlerbundRepository'
// import CustomerHaendlerbundMetric from './Entities/CustomerHaendlerbundMetricRepository'
// import Crawler from './Entities/CrawlerRepository'
// import CustomerMehrwertsteuercheck from './Entities/CustomerMehrwertsteuercheckRepository'
// import Memory from './Entities/MemoryRepository'
// import Score from './Entities/ScoreRepository'
// import AlertingPolicy from './Entities/AlertingPolicyRepository'
// import AlertingChannel from './Entities/AlertingChannelRepository'

// import Metric from './Entities/MetricRepository'
// import Auth from './Entities/AuthRepository'
// import ClusterUser from './Entities/ClusterUserRepository'
// import User from './Entities/UserRepository'
// import Invitation from './Entities/InvitationRepository'
// import Component from './Entities/ComponentRepository'
// import Project from './Entities/ProjectRepository'
// import System from './Entities/SystemRepository'
// import Screenshot from './Entities/ScreenshotRepository'
// import Tool from './Entities/ToolRepository'
// import Check from './Entities/CheckRepository'
// import CheckLighthouse from './Entities/CheckLighthouseRepository'
// import CheckA11y from './Entities/CheckA11yRepository'
// import CheckBrokenResource from './Entities/CheckBrokenResourceRepository'
// import CheckJavaScriptErrors from './Entities/CheckJavaScriptErrorsRepository'
// import CheckFileSize from './Entities/CheckFileSizeRepository'
// import CheckSitemap from './Entities/CheckSitemapRepository'
// import CheckMobileFriendly from './Entities/CheckMobileFriendlyRepository'
// import CheckCertificate from './Entities/CheckCertificateRepository'
// import CheckInsecureContent from './Entities/CheckInsecureContentRepository'
// import CheckCookie from './Entities/CheckCookieRepository'
// import CheckDeadLinks from './Entities/CheckDeadLinksRepository'
// import CheckHealthCheck from './Entities/CheckHealthCheckRepository'
// import Nixstats from './Entities/NixstatsRepository'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-02-14
 */
export default class RepositoryCollection {
  private readonly _repositories: any
  private _masterConnection: any
  private _clusterConnection: any

  constructor() {
    this._masterConnection = false
    this._clusterConnection = false
    this._repositories = {}

    // this._repositories['sequence'] = new Sequence()
    // this._repositories['marketplace'] = new Marketplace()
    this._repositories['subscription'] = new Subscription()
    // this._repositories['crawler'] = new Crawler()
    // this._repositories['customerhaendlerbund'] = new CustomerHaendlerbund()
    // this._repositories['customerhaendlerbundmetric'] = new CustomerHaendlerbundMetric()
    // this._repositories['customermehrwertsteuercheck'] = new CustomerMehrwertsteuercheck()
    // this._repositories['memory'] = new Memory()
    // this._repositories['score'] = new Score()
    // this._repositories['alertingpolicy'] = new AlertingPolicy()
    // this._repositories['alertingchannel'] = new AlertingChannel()
    this._repositories['websocket'] = new Websocket()
    // this._repositories['metric'] = new Metric()
    // this._repositories['auth'] = new Auth()
    // this._repositories['clusteruser'] = new ClusterUser()
    // this._repositories['user'] = new User()
    // this._repositories['invitation'] = new Invitation()
    // this._repositories['component'] = new Component()
    // this._repositories['project'] = new Project()
    // this._repositories['system'] = new System()
    // this._repositories['screenshot'] = new Screenshot()
    // this._repositories['tool'] = new Tool()
    // this._repositories['check'] = new Check()
    // this._repositories['checklighthouse'] = new CheckLighthouse()
    // this._repositories['checka11y'] = new CheckA11y()
    // this._repositories['checkbrokenresource'] = new CheckBrokenResource()
    // this._repositories['checkjavascripterrors'] = new CheckJavaScriptErrors()
    // this._repositories['checkfilesize'] = new CheckFileSize()
    // this._repositories['checksitemap'] = new CheckSitemap()
    // this._repositories['checkmobilefriendly'] = new CheckMobileFriendly()
    // this._repositories['checkcertificate'] = new CheckCertificate()
    // this._repositories['checkinsecurecontent'] = new CheckInsecureContent()
    // this._repositories['checkcookie'] = new CheckCookie()
    // this._repositories['checkdeadlinks'] = new CheckDeadLinks()
    // this._repositories['checkhealthcheck'] = new CheckHealthCheck()
    // this._repositories['nixstats'] = new Nixstats()
    // this._repositories['incident'] = new Incident()
  }

  setClusterConnection(connection) {
    this._clusterConnection = connection
  }

  setMasterConnection(connection) {
    this._masterConnection = connection
  }

  getRepository(entityType: TRepositories): IRepositoryCollectionRepos | Error {
    const repositoryName = entityType.toLowerCase()
    if (repositoryName in this._repositories) {
      const repo = this._repositories[repositoryName]
      if (repo.getConnectionType() === 'ClusterConnection') {
        repo.setConnection(this._clusterConnection)
      } else {
        repo.setConnection(this._masterConnection)
      }
      return this._repositories[repositoryName]
    } else {
      throw new Error(`No repository with name ${repositoryName} found. Registered repositories are:
         ${JSON.stringify(Object.keys(this._repositories))}
        `)
    }
  }
}
