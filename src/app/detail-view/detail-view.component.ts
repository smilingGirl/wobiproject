import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { WorldService } from '../services/world.service';
import { CharacterService } from '../services/character.service';
import { CultureService } from '../services/culture.service';
import { CountryService } from '../services/country.service';

import { World, Country, Character, Culture } from '../model/schema';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  providers: [WorldService, CharacterService, CultureService, CountryService]
})
export class DetailViewComponent implements OnInit {
  selectedInputCharacteristic;
  
  @Input() selectedWorldId: number;

  worlds: World[];
  characters: Character[];
  cultures: Culture[];
  countries: Country[];

  constructor(
    private _charaDataService: CharacterService, 
    private _dataService: WorldService,
    private _cultDataService: CultureService,
    private _counDataService: CountryService, 
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
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
      console.log(this.selectedWorldId);
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
