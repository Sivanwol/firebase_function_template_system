export class EventNotSentError extends Error {
    constructor(event: any) {
        super(`Error in send event that missing data ,  ${event}`);
    }
}