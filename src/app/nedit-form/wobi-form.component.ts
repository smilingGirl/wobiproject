import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from '../model/schema';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { WorldService } from '../services/world.service';

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
  wip:boolean = false;
 
  constructor(private fb: FormBuilder, private _dataService: WorldService, public ngxSmartModalService: NgxSmartModalService) {
    this.wobiForm = new FormGroup({
      'name': this.name,
      country: new FormControl(),
      culture: new FormControl(),
      fname: new FormControl(),
      age: new FormControl(),
      status: new FormControl(),
      wip: new FormControl()
    }) 
  }

  @Input() selectedInputCharacteristic: string;

  
  ngOnInit() {
  }

  onSubmitModelBased() {
    console.log("model-based form submitted");
    console.log(this.wobiForm);
    if (this.selectedInputCharacteristic  == "world") {
      console.log(this.wobiForm.value);
      this.newWorld(this.wobiForm.value.name, this.wobiForm.value.wip);
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
      alert('Failed fetching worlds');
    });
  }

}