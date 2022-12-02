import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Production } from "../models/production.model";

@Injectable({
    providedIn: 'root'
})
export class ProductionService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }
    
    public getProductions(): Observable<Production[]> {
        return this.http.get<Production[]>(`${this.apiServerUrl}/api/v1/productions`);    
    }

    public getProductionById(id: string): Observable<Production> {
        return this.http.get<Production>(`${this.apiServerUrl}/api/v1/production/${id}`);
    }

    public addProduction(glebeId: string, production: Production): Observable<Production> {
        return this.http.post<Production>(`${this.apiServerUrl}/api/v1/glebes/${glebeId}/production/`, production);    
    }

    public updateProduction(glebeId: string, productionId: string, production: Production): Observable<Production> {
        return this.http.put<Production>(`${this.apiServerUrl}/api/v1/glebes/${glebeId}/production/${productionId}`, production);    
    }

    public deleteProduction(glebeId: string, productionId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/glebes/${glebeId}/production/${productionId}`);   
    }

}
