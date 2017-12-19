import {QueryReplyModel} from './queryReplyModel';

export class QueryModel {
    subject :String;
    message : String;
    requestor : String;
    advisor : String ;
    requestOn : Number;
    reply : QueryReplyModel;
    unread : true;
    _id: String;
}