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
export class DetailViewComponent {
  //Control variables
  selectedInputCharacteristic;
  detailViewActivated;
  
  @Input() selectedWorldId: number;

  worlds: World[];
  characters: Character[];
  cultures: Culture[];
  countries: Country[];
  world: World;
  character: Character;
  culture: Culture;
  country: Country;

  constructor(
    private _charaDataService: CharacterService, 
    private _dataService: WorldService,
    private _cultDataService: CultureService,
    private _counDataService: CountryService, 
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  /*All the getter functions fot the different entities*/
  private loadCharacters(worldID) {
    this._charaDataService.fetchCharacterEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "character";
      this.detailViewActivated = false;
      this.characters = data;
    }, error => {
      alert('Failed fetching characters');
    });
  }

  private loadCultures(worldID) {
    this._cultDataService.fetchCultureEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "culture";
      this.detailViewActivated = false;
      this.cultures = data;
      console.log(this.selectedWorldId);
    }, error => {
      alert('Failed fetching cultures');
    });
  }

  private loadCountires(worldID) {
    this._counDataService.fetchCountryEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = "country";
      this.detailViewActivated = false;
      this.countries = data;
    }, error => {
      alert('Failed fetching countries');
    });
  }

  /*Getter functions for specific entity by their ID*/
  private loadCountry(worldID, id) {
    this._counDataService.fetchCountryEntry(worldID, id).subscribe(data => {
      this.country = data;
      this.detailViewActivated = true;
    }, error => {
      alert('Failed fetching this country');
    });
  }

  private loadCulture(worldID, id) {
    this._cultDataService.fetchCultureEntry(worldID, id).subscribe(data => {
      this.culture = data;
      this.detailViewActivated = true;
    }, error => {
      alert('Failed fetching this culture');
    });
  }

  private loadCharacter(worldID, id) {
    this._charaDataService.fetchCharacterEntry(worldID, id).subscribe(data => {
      this.character = data;
      this.detailViewActivated = true;
    }, error => {
      alert('Failed fetching this character');
    });
  }


}
