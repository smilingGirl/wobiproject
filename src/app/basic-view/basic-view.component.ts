import { Component } from '@angular/core';

import { WorldService } from '../services/world.service';

import { World} from '../model/schema';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss'],
  providers: [WorldService]
})
export class BasicViewComponent {
  worlds: World[];
  world: World;
  showDialog = false;
  selectedWorldId;

  constructor(
    private _dataService: WorldService
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

  private loadWorld(id) {
    this._dataService.fetchWorldEntry(id).subscribe(data => {
      this.world = data;
      this.selectedWorldId = data._id;
    }, error => {
      alert('Failed fetching worlds');
    });
  }
}

