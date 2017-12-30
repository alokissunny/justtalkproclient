import {QueryReplyModel} from './queryReplyModel';

export class QueryModel {
    subject :String;
    message : String;
    requestor : String;
    advisor : String ;
    requestOn : Number;
    reply : QueryReplyModel;
    _id: String;
    deleteForAdvisor : Boolean = false;
    deleteForRequestor : Boolean = false;
    unreadForRequestor : Boolean = true;
    unreadForAdvisor : Boolean = true;
    lastUpdatedFrom : String;

}