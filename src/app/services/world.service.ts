import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {World} from '../model/schema';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorldService {

  private webServiceUrl = 'http://localhost:8080/worlds/';

  constructor(private http: HttpClient) { }

  public fetchWorldEntries(): Observable<World[]> {
    return this.http.get<World[]>(this.webServiceUrl);
  }
  public fetchWorldEntry(id: number): Observable<World> {
    return this.http.get<World>(this.webServiceUrl + id);
  }
  public createWorld(entry: World): Observable<World> {
    return this.http.post<World>(this.webServiceUrl, JSON.stringify(entry), httpOptions);
  }
  public updateWorld(entry: World): Observable<World> {
    return this.http.put<World>(this.webServiceUrl + entry._id, JSON.stringify(entry), httpOptions);
  }
  public deleteWorld(entry: World): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + entry._id);
  }

}
