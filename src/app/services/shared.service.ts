import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import {  World } from '../model/schema';

@Injectable()
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    private emitWorldChangeSource = new Subject<World>();
    private emitEntityTypeChangeSource = new Subject<string>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    changeWorldEmitted$ = this.emitWorldChangeSource.asObservable();
    changeEntityTypeEmitted$ = this.emitEntityTypeChangeSource.asObservable();
    // Service message commands
    emitChange(value: any) {
        this.emitChangeSource.next(value);
    }
    emitWorldChange(value: World) {
        this.emitWorldChangeSource.next(value);
    }
    emitEntitiyChange(value: string) {
      this.emitEntityTypeChangeSource.next(value);
  }
}
