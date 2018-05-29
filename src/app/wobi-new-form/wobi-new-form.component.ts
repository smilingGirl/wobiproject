import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from '../model/schema';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { WorldService } from '../services/world.service';
import { CharacterService } from '../services/character.service';
import { CultureService } from '../services/culture.service';
import { CountryService } from '../services/country.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-wobi-form',
  templateUrl: './wobi-new-form.component.html',
  styleUrls: ['./wobi-new-form.component.scss'],
  providers: [WorldService, CharacterService, CultureService, CountryService]
})

// @Modal()
export class WobiFormComponent implements OnInit {
  // Helper variables
  private _selectedWorldId: number;
  private _selectedInputCharacteristic: string;

  // Information storage Varaibles
  cultures: Culture[];
  countries: Country[];
  character: Character;

  // Form variables
  wobiForm: FormGroup;
  name = new FormControl('', Validators.required);
  lname: string = '';
  age: number;
  country: string = '';
  culture: string = '';
  status: string = '';
  system: string = '';
  wip: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _dataService: WorldService,
    public ngxSmartModalService: NgxSmartModalService,
    private _charaService: CharacterService,
    private _cultService: CultureService,
    private _countSevice: CountryService,
    private toastr: ToastrService,
    private _sharedService: SharedService
  ) {
    this.wobiForm = new FormGroup({
      'name': this.name,
      country: new FormControl(),
      culture: new FormControl(),
      lname: new FormControl(),
      age: new FormControl(),
      status: new FormControl(Validators.required),
      system: new FormControl(),
      wip: new FormControl(Validators.required)
    });
    this._sharedService.changeEntityTypeEmitted$.subscribe( value => {
      this._selectedInputCharacteristic = value;
    });
  }

  @Input() set selectedWorldId(value: number) {
    this._selectedWorldId = value;
  }
  @Output() newCharacter = new EventEmitter<Character>();
  @Output() newCulture = new EventEmitter<Culture>();
  @Output() newCountry = new EventEmitter<Country>();

  ngOnInit() {
    this.loadCountries(this._selectedWorldId);
    this.loadCultures(this._selectedWorldId);
  }

  onSubmitModelBased() {
    // create new entitiy
    if (this._selectedInputCharacteristic  === 'world') {
      this.createWorld(this.wobiForm.value.name, this.wobiForm.value.wip);
    } else if (this._selectedInputCharacteristic  === 'character') {
      this.createCharacter(
        this.wobiForm.value.name,
        this.wobiForm.value.lname,
        this.wobiForm.value.age,
        this.wobiForm.value.status,
        this.wobiForm.value.culture,
        this.wobiForm.value.country,
        this._selectedWorldId
      );
    } else if (this._selectedInputCharacteristic === 'culture') {
      this.createCulture(this.wobiForm.value.name, this._selectedWorldId);
    } else if (this._selectedInputCharacteristic === 'country') {
      this.createCountry(this.wobiForm.value.name, this.wobiForm.value.system, this._selectedWorldId);
    }
    // edit existing entity
    this.ngxSmartModalService.getModal('newFormModal').close();
    this.wobiForm.reset();
  }

  /* Functions to handle the creation of new elements */
  private createWorld(name, wip) {
    const newW = <World>{};
    newW.name = name;
    if (wip !== false) {wip = true; }
    newW.WorkInProgress = wip;

    this._dataService.createWorld(newW).subscribe(data => {
      this._sharedService.emitWorldChange(data);
    }, error => {
      this.toastr.error('Failed creating a new world!', 'Error');
    });
  }

  private createCharacter(firstname, lastname, age, status, culture, country, worldID) {
    const newC = <Character>{};
    newC.lastName = lastname;
    newC.firstName = firstname;
    if (age !== null && typeof age !== 'undefined') {newC.age = age; }
    if (culture !== null && typeof culture !== 'undefined') {newC.culture = culture; }
    if (country !== null && typeof country !== 'undefined') {newC.country = country; }
    newC.status = status;
    newC.worldID = worldID;
    console.log(newC);
    console.log(typeof newC.culture.type);
    this._charaService.createCharacter(newC).subscribe(data => {
      this.newCharacter.emit(data);
      this.toastr.success('Succesfully create a new character!', 'Created!');
    }, error => {
      this.toastr.error('Failed creating a new character!', 'Error');
    });
  }

  private createCountry(name, system, worldID ) {
    const newC = <Country>{};
    newC.name = name;
    newC.system = system;
    newC.worldID = worldID;

    this._countSevice.createCountry(newC).subscribe(data => {
      this.newCountry.emit(data);
      this.toastr.success('Succesfully create a new country!', 'Created!');
    }, error => {
      this.toastr.error('Failed creating a new country!', 'Error');
    });
  }

  private createCulture(name, worldID ) {
    const newC = <Culture>{};
    newC.name = name;
    newC.worldID = worldID;

    this._cultService.createCulture(newC).subscribe(data => {
      this.newCulture.emit(data);
      this.toastr.success('Succesfully create a new culture!', 'Created!');
    }, error => {
      this.toastr.error('Failed creating a new culture!', 'Error');
    });
  }

  /* Load information about specific world, e.g. getter functions for countries and cultures */
  private loadCultures(worldID) {
    this._cultService.fetchCultureEntries(worldID).subscribe(data => {
      this.cultures = data;
    }, error => {
      this.toastr.error('Failed fetching cultures!', 'Error');
    });
  }

  private loadCountries(worldID) {
    this._countSevice.fetchCountryEntries(worldID).subscribe(data => {
      this.countries = data;
    }, error => {
      this.toastr.error('Failed fetching countries!', 'Error');
    });
  }
}
