import { TRepositories } from '../typescript/interfaces/global/repos';
import { IRepositoryCollectionRepos } from "../typescript/interfaces/360ApiClient.interface";
export default class RepositoryCollection {
    private readonly _repositories;
    private _masterConnection;
    private _clusterConnection;
    constructor();
    setClusterConnection(connection: any): void;
    setMasterConnection(connection: any): void;
    getRepository(entityType: TRepositories): IRepositoryCollectionRepos | Error;
}
