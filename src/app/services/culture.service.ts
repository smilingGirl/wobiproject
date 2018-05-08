import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Culture} from '../model/schema';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CultureService {

  private webServiceUrl = 'http://localhost:8080/';
  private branchUrl = '/cultures/';

  constructor(private http: HttpClient) { }

  public fetchCultureEntries(worldID: number): Observable<Culture[]> {
    return this.http.get<Culture[]>(this.webServiceUrl + worldID + this.branchUrl);
  }
  public fetchCultureEntry(worldID: number, id: number): Observable<Culture> {
    return this.http.get<Culture>(this.webServiceUrl + worldID + this.branchUrl + id);
  }
  public createCulture(entry: Culture): Observable<Culture> {
    return this.http.post<Culture>(this.webServiceUrl + entry.worldID + this.branchUrl, JSON.stringify(entry), httpOptions);
  }
}
