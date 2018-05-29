import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Character} from '../model/schema';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CharacterService {

  private webServiceUrl = 'http://localhost:8080/worlds/';
  private branchUrl = '/characters/';

  constructor(private http: HttpClient) { }

  public fetchCharacterEntries(worldID: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.webServiceUrl + worldID + this.branchUrl);
  }
  public fetchCharacterEntry(worldID: number, id: number): Observable<Character> {
    return this.http.get<Character>(this.webServiceUrl + worldID + this.branchUrl + id);
  }
  public createCharacter(entry: Character): Observable<Character> {
    return this.http.post<Character>(this.webServiceUrl + entry.worldID + this.branchUrl, JSON.stringify(entry), httpOptions);
  }
  public updateCharacter(entry: Character): Observable<Character> {
    return this.http.put<Character>(this.webServiceUrl + entry.worldID + this.branchUrl + entry._id, JSON.stringify(entry), httpOptions);
  }
  public deleteCharacter(worldID: number, id: number): Observable<any> {
    return this.http.delete<any>(this.webServiceUrl + worldID + this.branchUrl + id);
  }

}
