declare class BadRequestError extends Error {
    protected url: string;
    protected data: any;
    protected identifier: any;
    constructor(errorData: any);
}
export default BadRequestError;
