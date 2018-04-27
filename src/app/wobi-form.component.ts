import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from './model/schema';
import { WorldService } from './services/world.service';

@Component({
  selector: 'wobi-form',
  templateUrl: './wobi-form.component.html',
  styleUrls: ['./wobi-form.component.scss'],
  providers: [WorldService]
})
export class wobiFormComponent {
  wobiForm: FormGroup;
  post:any;
  description:string = '';
  name:string = '';
  worlds: World[];

  constructor(private fb: FormBuilder, private _dataService: WorldService) {
    this.wobiForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl()
    })
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }
}