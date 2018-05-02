import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {World} from '../model/schema';
//import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';

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
    return this.http.put<World>(this.webServiceUrl + entry.properties.id, JSON.stringify(entry), httpOptions);
  }
  public deleteWorld(entry: World): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + entry.properties.id);
  }

  /*public fetchWorldEntries() {
    return this.http.get(this.webServiceUrl).map((res:Response) => res.json());
  }
  public fetchWorldEntry(id: number) {
    return this.http.get(this.webServiceUrl + id).map((res:Response) => res.json());
  }
  public createWorld(entry: World) {
    return this.http.post(this.webServiceUrl, JSON.stringify(entry)).map((res:Response) => res.json());
  }
  public updateWorld(entry: World) {
    return this.http.put(this.webServiceUrl + entry.properties.id, JSON.stringify(entry)).map((res:Response) => res.json());
  }
  public deleteWorld(entry: World) {
    return this.http.delete(this.webServiceUrl + entry.properties.id).map((res:Response) => res.json());
  }*/
}
