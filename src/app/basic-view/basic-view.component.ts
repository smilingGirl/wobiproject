import { Component } from '@angular/core';

import { WorldService } from '../services/world.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { World, Country, Character, Culture } from '../model/schema';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss'],
  providers: [WorldService]
})
export class BasicViewComponent {
  worlds: World[];
  showDialog = false;

  constructor(private _dataService: WorldService, public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit(): void {
    this.loadWorlds();
  }

  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
    }, error => {
      console.log('Failed fetching worlds');
    });
  }
}

