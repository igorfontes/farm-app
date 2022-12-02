import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Farm } from "../models/farm.model";

@Injectable({
    providedIn: 'root'
})
export class FarmService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }
    
    public getFarms(): Observable<Farm[]> {
        return this.http.get<Farm[]>(`${this.apiServerUrl}/api/v1/farms`); 
    }

    public getFarmById(id: string): Observable<Farm> {
        return this.http.get<Farm>(`${this.apiServerUrl}/api/v1/farms/${id}`);
    }

    public addFarm(farm: Farm): Observable<Farm> {
        return this.http.post<Farm>(`${this.apiServerUrl}/api/v1/farms`, farm);    
    }

    public updateFarm(farm: Farm): Observable<Farm> {
        return this.http.put<Farm>(`${this.apiServerUrl}/api/v1/farms/${farm.id}`, farm);    
    }

    public deleteFarm(farmId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/farms/${farmId}`);   
    }

    public updateProductivity(farmId: string): Observable<void>{
        return this.http.put<void>(`${this.apiServerUrl}/api/v1/farms/${farmId}/productivity`, null);
    }

}
