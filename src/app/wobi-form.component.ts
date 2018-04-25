import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Import the Schema for World, Country, Character, Culture
import { World, Country, Character, Culture } from '../../server/lib/schema';

@Component({
  selector: 'wobi-form',
  templateUrl: './wobi-form.component.html',
  styleUrls: ['./wobi-form.component.scss']
})
export class wobiFormComponent {
  wobiForm: FormGroup;
  post:any;
  description:string = '';
  name:string = '';

  constructor(private fb: FormBuilder) {
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