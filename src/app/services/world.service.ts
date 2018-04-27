import { Injectable } from '@angular/core';
import {World} from '../model/schema';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*const httpOptions = {
  headers : new Headers({ 'Content-Type': 'application/json' })
};*/

@Injectable()
export class WorldService {

  private webServiceUrl = 'http://localhost:8080/worlds';

  constructor (
    private http: Http
  ) {}

  public fetchWorldEntries() {
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
  }

}
