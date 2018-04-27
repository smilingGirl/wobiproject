import { Component } from '@angular/core';
import { WorldService } from './services/world.service';
import * as $ from 'jquery';

import { World, Country, Character, Culture } from './model/schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WorldService]
})
export class AppComponent {
  worlds: World[];

  constructor(private _dataService: WorldService) {
  }

  ngOnInit(): void {
    this.loadWorlds();
  }

  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
    }, error => {
      console.log('Failed fetching events');
    });
  }

  public addWorld(){
    //
  }

  public openNewForm() {
    $("#newFormModal").modal()
  }
}

