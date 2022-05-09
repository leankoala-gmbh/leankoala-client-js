export default class Repository {
    protected _connectionType: string;
    protected _connection: any;
    constructor();
    s: any;
    protected _assertValidArguments(requiredArguments: any[], actualArguments: any): void;
    setConnection(connection: any): void;
    getConnectionType(): string;
}
