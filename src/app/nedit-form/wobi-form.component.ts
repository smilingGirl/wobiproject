import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from '../model/schema';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { WorldService } from '../services/world.service';

enum ObjectTypes {
  world =  "world",
  chara = "character",
  culture = "culture",
  country = "country"
}

@Component({
  selector: 'wobi-form',
  templateUrl: './wobi-form.component.html',
  styleUrls: ['./wobi-form.component.scss'],
  providers: [WorldService]
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
  ObjectTypes: typeof  ObjectTypes = ObjectTypes;
  type: ObjectTypes;

  worlds: World[];

  constructor(private fb: FormBuilder, private _dataService: WorldService, public ngxSmartModalService: NgxSmartModalService) {
    this.wobiForm = new FormGroup({
      'name': this.name,
      country: new FormControl(),
      culture: new FormControl(),
      fname: new FormControl(),
      age: new FormControl(),
      status: new FormControl()
    }) 
  }

  ngOnInit() {
  }

  onSubmitModelBased() {
    console.log("model-based form submitted");
    console.log(this.wobiForm);
    this.ngxSmartModalService.getModal('neditFormModal').close();
  }

  getType() {
    this.type = ObjectTypes.world;
  }
}