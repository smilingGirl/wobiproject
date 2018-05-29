import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { WorldService } from '../services/world.service';
import { SharedService } from '../services/shared.service';

import { World, Character} from '../model/schema';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss'],
  providers: [WorldService]
})

export class BasicViewComponent implements OnInit {
  worlds: World[];
  world: World;
  selectedWorldId;

  constructor(
    private _dataService: WorldService,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService,
    private _sharedService: SharedService
  ) {
    this._sharedService.changeEmitted$.subscribe( id => {
      console.log(id);
      for (let i = 0; i < this.worlds.length; i++) {
        if (this.worlds[i]._id.toString() === id.toString()) {
          this.worlds.splice(i, 1);
          this.selectedWorldId = null;
          this.toastr.success('Succesfully deleted this world!', 'Deleted World!');
        }
      }
    });
    this._sharedService.changeWorldEmitted$.subscribe( newW => {
      this.onNewWorld(newW);
    });
  }

  ngOnInit(): void {
    this.loadWorlds();
  }

  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
    }, error => {
      this.toastr.error('Failed fetching worlds!', 'Error');
    });
  }

  private loadWorld(id) {
    this._dataService.fetchWorldEntry(id).subscribe(data => {
      this.world = data;
      this.selectedWorldId = data._id;
    }, error => {
      this.toastr.error('Failed fetching this world!', 'Error');
    });
  }

  private newWorld() {
    this._sharedService.emitEntitiyChange('world');
    this.ngxSmartModalService.getModal('newFormModal').open();
  }

  // Event handler for new World created
  onNewWorld(newWorld: World) {
    this.worlds.push(newWorld);
    this.toastr.success('Succesfully added a new world!', 'New World!');
  }

  // Event handler for World deleted
  private onDeletedWorld(worldID) {
    for (let i = 0; i < this.worlds.length; i++) {
      if (this.worlds[i]._id === worldID) {
        this.worlds.splice(i, 1);
        this.selectedWorldId = null;
        this.toastr.success('Succesfully deleted this world!', 'Deleted World!');
      }
    }
  }

/* Set the width of the side navigation to 250px */
private openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}

/* Set the width of the side navigation to 0 */
private closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
}

