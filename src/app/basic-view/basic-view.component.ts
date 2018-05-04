import { Component } from '@angular/core';

import { WorldService } from '../services/world.service';
import { CharacterService } from '../services/character.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { World, Country, Character, Culture } from '../model/schema';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss'],
  providers: [WorldService, CharacterService]
})
export class BasicViewComponent {
  worlds: World[];
  items = [];
  showDialog = false;

  constructor(
    private _charaDataService: CharacterService, 
    private _dataService: WorldService, 
    public ngxSmartModalService: NgxSmartModalService,
  ){}

  ngOnInit(): void {
    this.loadWorlds();
  }

  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }

  public loadCharacters(worldID) {
    this._charaDataService.fetchCharacterEntries(worldID).subscribe(data => {
      this.items = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }


}

