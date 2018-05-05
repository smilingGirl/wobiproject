import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { WorldService } from '../services/world.service';
import { CharacterService } from '../services/character.service';
import { CultureService } from '../services/culture.service';
import { CountryService } from '../services/country.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { World, Country, Character, Culture } from '../model/schema';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.scss'],
  providers: [WorldService, CharacterService, CultureService, CountryService]
})
export class BasicViewComponent {
  //private sub: any;
  //private parentRouteId: number;

  selectedInputCharacteristic;

  worlds: World[];
  characters: Character[];
  cultures: Culture[];
  countries: Country[];
  showDialog = false;

  constructor(
    private _charaDataService: CharacterService, 
    private _dataService: WorldService,
    private _cultDataService: CultureService,
    private _counDataService: CountryService, 
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadWorlds();
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  public configureWorldId() {
    //console.log(this.router.routerState.snapshot);
    /*debugger;
    this.route.parent.params.forEach((params: Params) => {
        console.log(params['url']);
        //console.log(+params['id']);
    });
    console.log(this.sub);*/
  }

  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
      this.selectedInputCharacteristic = "world";
    }, error => {
      alert('Failed fetching worlds');
    });
  }

  private loadCharacters(worldID) {
    this._charaDataService.fetchCharacterEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "character";
      this.characters = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }

  private loadCultures(worldID) {
    this._cultDataService.fetchCultureEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "culture";
      this.cultures = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }

  private loadCountires(worldID) {
    this._counDataService.fetchCountryEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "country";
      this.countries = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }


}

