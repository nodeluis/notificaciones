import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class ProcessService{

    private processUrl: string = "processes";
    private typeUrl: string = "processes/types";
    private modeUrl: string = "processes/modes";
    private activitiesUrl: string = "activities";
    private contactsUrl: string = 'contacts';
    private actionsUrl: string = 'actions/defaults';
    private baseActionsUrl: string = "actions";

    constructor(private http: HttpClient) {}

    getProcesses(): Observable<any>{
        return this.http.get(this.processUrl);
    }

    getTypes(): Observable<any>{
        return this.http.get(this.typeUrl);
    }

    getModes(): Observable<any>{
        return this.http.get(this.modeUrl);
    }

    getProcessById(processId: String): Observable<any>{
        return this.http.get(`${this.processUrl}/${processId}`);
    }

    createProcess(newProc: Object): Observable<any>{
        return this.http.post(this.processUrl, newProc);
    }

    getActivitiesByProcessId(processId: String): Observable<any>{
        return this.http.get(`${this.activitiesUrl}/${processId}`);
    }

    getProcessActionsByTypeAndMode(processTypeId: string, processModeId: string): Observable<any>{
        let params = new HttpParams();
        if(processTypeId.length>0){
            params = params.append("type", processTypeId)
            //params.set("type", processTypeId);
        }
        if(processModeId.length>0){
            params = params.append("mode", processModeId)
            //params.set("mode", processModeId);
        }

        return this.http.get(`${this.actionsUrl}`, {
            params: params
        });
    }

    getLinkedActionsByProcessId(processId: String): Observable<any>{
        return this.http.get(`${this.baseActionsUrl}/${processId}`);
    }

    addActivityToProcess(processId: String, newActivity: Object): Observable<any>{
        return this.http.post(`${this.activitiesUrl}/${processId}/create`, newActivity);
    }

    addActionToProcess(processId: String, newAction: Object): Observable<any>{
        return this.http.post(`${this.baseActionsUrl}/${processId}/create`, newAction);
    }

    getContactsByProcessId(processId: String): Observable<any>{
        return this.http.get(`${this.contactsUrl}/${processId}`);
    }

    addContactToProcess(processId: String, newContact: Object): Observable<any>{
        return this.http.post(`${this.contactsUrl}/${processId}/create`, newContact);
    }
}