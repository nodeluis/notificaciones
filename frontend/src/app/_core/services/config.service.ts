import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class ConfigsService{

    private configsUrl: string = "configs";

    constructor(private http: HttpClient) {}

    getConfigs(): Observable<any>{
        return this.http.get(this.configsUrl);
    }

    updateConfigs(formData: any): Observable<any>{
        return this.http.put(this.configsUrl, formData);
    }
}