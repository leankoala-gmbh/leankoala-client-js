import { IConnectArgs, IAuthenticateArgs, IConnectionSendResult, IGetUrlArgs, IGetWakeUpTokenResult, IRefreshAccessToken, IRoute, IUser } from '../typescript/interfaces/global/connection';
declare class Connection {
    private _refreshRoute;
    private _accessToken;
    private _refreshToken;
    private _user;
    private _accessExpireTimestamp;
    private _refreshExpireTimestamp;
    private readonly _apiServer;
    private _preferredLanguage;
    private readonly _axios;
    private _axiosAdapter;
    private readonly _defaultParameters;
    private readonly _registeredEventListeners;
    private readonly _routes;
    private _connectionArgs;
    constructor(apiServer: any, axios: any);
    connect(args: IConnectArgs): Promise<void>;
    private _connectByWakeUpToken;
    getAccessToken(): string;
    getExpireDate(): number;
    getWakeUpToken(): IGetWakeUpTokenResult;
    getUser(): Partial<IUser>;
    private _getUrl;
    send(route: IRoute, data: object | {
        [key: string]: string;
    }, withoutToken?: boolean): Promise<IRefreshAccessToken>;
    setLanguage(language: any): void;
    addDefaultParameter(key: any, value: any): void;
    _assertValidResponse(response: IConnectionSendResult, url: string, data: IGetUrlArgs | object): void;
    _authenticate(args: IAuthenticateArgs): Promise<void>;
    _refreshTokenExpireDate(withRefreshToken?: boolean): void;
    setAccessToken(token: any, refreshToken: any): void;
    refreshAccessToken(forceRefresh?: boolean, withMemories?: boolean): Promise<void>;
    setUser(user: any): void;
    setRefreshRoute(route: any): void;
    on(eventName: any, callback: any): void;
    _publish(eventName: any, payload: any): void;
}
export default Connection;
