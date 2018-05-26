import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from '../model/schema';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { WorldService } from '../services/world.service';
import { CharacterService } from '../services/character.service';
import { CultureService } from '../services/culture.service';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'wobi-form',
  templateUrl: './wobi-form.component.html',
  styleUrls: ['./wobi-form.component.scss'],
  providers: [WorldService, CharacterService, CultureService, CountryService]
})

//@Modal()
export class wobiFormComponent implements OnInit{
  wobiForm: FormGroup;

  name = new FormControl("", Validators.required);
  fname:string = '';
  age:number;
  country:string = '';
  culture:string = '';
  status:string = '';
  system:string = '';
  wip:boolean = false;
  private _selectedWorldId: number;
 
  constructor(
    private fb: FormBuilder, 
    private _dataService: WorldService, 
    public ngxSmartModalService: NgxSmartModalService, 
    private _charaService: CharacterService,
    private _cultService: CultureService,
    private _countSevice: CountryService 
  ){
    this.wobiForm = new FormGroup({
      'name': this.name,
      country: new FormControl(),
      culture: new FormControl(),
      fname: new FormControl(),
      age: new FormControl(),
      status: new FormControl(),
      system: new FormControl(),
      wip: new FormControl()
    }) 
  }

  @Input() selectedInputCharacteristic: string;
  @Input() set selectedWorldId(value: number) {
    this._selectedWorldId = value;
    console.log(this._selectedWorldId);
  }

  
  ngOnInit() {
  }

  onSubmitModelBased() {
    console.log("model-based form submitted");
    if (this.selectedInputCharacteristic  == "world") {
      this.newWorld(this.wobiForm.value.name, this.wobiForm.value.wip);
    } else if (this.selectedInputCharacteristic  == "character") {
      this.newCharacter(this.wobiForm.value.fname, this.wobiForm.value.name, this.wobiForm.value.age, this.wobiForm.value.status, this._selectedWorldId);
    } else if (this.selectedInputCharacteristic == "culture") {
      this.newCulture(this.wobiForm.value.name, this._selectedWorldId);
    } else if (this.selectedInputCharacteristic == "country") {
      this.newCountry(this.wobiForm.value.name, this.wobiForm.value.system, this._selectedWorldId);
    }
    this.ngxSmartModalService.getModal('neditFormModal').close();
  }


  private newWorld(name, wip) {
    var newW = <World>{};
    newW.name = name;
    if(wip != true) {wip = false};
    newW.WorkInProgress = wip;

    this._dataService.createWorld(newW).subscribe(data => {
      console.log(data);
    }, error => {
      alert('Failed creating a new world');
    });
  }

  private newCharacter(firstname, lastname, age, status, worldID) {
    var newC = <Character>{};
    newC.lastName = lastname;
    newC.firstName = firstname;
    newC.age = age;
    newC.status = status;
    newC.worldID = worldID;

    this._charaService.createCharacter(newC).subscribe(data => {
      console.log(data);
    }, error => {
      alert('Failed creating a new character');
    });
  }

  private newCountry(name,system, worldID ) {
    var newC = <Country>{};
    newC.name = name;
    newC.system = system;
    newC.worldID = worldID;

    this._countSevice.createCountry(newC).subscribe(data => {
      console.log(data);
    }, error => {
      alert('Failed creating a new country');
    });
  }

  private newCulture(name, worldID ) {
    var newC = <Culture>{};
    newC.name = name;
    newC.worldID = worldID;

    this._cultService.createCulture(newC).subscribe(data => {
      console.log(data);
    }, error => {
      alert('Failed creating a new culture');
    });
  }

}