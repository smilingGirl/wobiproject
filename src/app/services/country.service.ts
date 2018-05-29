import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Country} from '../model/schema';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CountryService {

  private webServiceUrl = 'http://localhost:8080/worlds/';
  private branchUrl = '/countries/';

  constructor(private http: HttpClient) { }

  public fetchCountryEntries(worldID: number): Observable<Country[]> {
    return this.http.get<Country[]>(this.webServiceUrl + worldID + this.branchUrl);
  }
  public fetchCountryEntry(worldID: number, id: number): Observable<Country> {
    return this.http.get<Country>(this.webServiceUrl + worldID + this.branchUrl + id);
  }
  public createCountry(entry: Country): Observable<Country> {
    return this.http.post<Country>(this.webServiceUrl + entry.worldID + this.branchUrl, JSON.stringify(entry), httpOptions);
  }

}
