import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  NgxSmartModalService
} from 'ngx-smart-modal';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  WorldService
} from '../services/world.service';
import {
  CharacterService
} from '../services/character.service';
import {
  CultureService
} from '../services/culture.service';
import {
  CountryService
} from '../services/country.service';

import {
  World,
  Country,
  Character,
  Culture
} from '../model/schema';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  providers: [WorldService, CharacterService, CultureService, CountryService]
})
export class DetailViewComponent implements OnInit {
  // Control variables
  private editMode: boolean;
  private _selectedWorldId: number;
  selectedInputCharacteristic;
  detailViewActivated;

  // display variables
  worlds: World[];
  characters: Character[];
  cultures: Culture[];
  countries: Country[];
  world: World;
  character: Character;
  culture: Culture;
  country: Country;

  @Input() set selectedWorldId(value: number) {
    this._selectedWorldId = value;
    this.loadWorld(this._selectedWorldId);
  }
  @Output() deletedWorld = new EventEmitter<number>();

  get currentWorldId(): number {
    return this._selectedWorldId;
  }

  // Form variables
  editForm: FormGroup;
  wname: string = '';
  coname: string = '';
  cuname: string = '';
  caname: string = '';
  fname: string = '';
  age: number;
  status: string = '';
  system: string = '';
  wip: boolean = false;

  constructor(
    private _charaDataService: CharacterService,
    private _dataService: WorldService,
    private _cultDataService: CultureService,
    private _counDataService: CountryService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.editForm = new FormGroup({
      wname: new FormControl('', Validators.required),
      caname: new FormControl(''),
      country: new FormControl(),
      culture: new FormControl(),
      fname: new FormControl('', Validators.required),
      age: new FormControl(),
      status: new FormControl(''),
      system: new FormControl(),
      wip: new FormControl(false, Validators.required)
    });
  }

  ngOnInit(): void {
    this.editMode = false;
    this.loadWorld(this._selectedWorldId);
  }

  /* Control function to enter edit mode */
  private editModeStart() {
    this.editMode = true;
  }

  private editModeEnd() {
    this.editMode = false;
  }

  private saveChanges(worldname, wip, countryname, system, culturename, charaname, charalname, age, status) {
    if (this.selectedInputCharacteristic === 'world') {
      if (this.editForm.value.wname === '') {
        this.editForm.value.wname = this.world.name;
      }
      this.editWorld(this.editForm.value.wname, this.editForm.value.wip, this.currentWorldId);
    } else if (this.selectedInputCharacteristic === 'character') {
      console.log(this.editForm.value);
      if (this.editForm.value.caname === '') {
        this.editForm.value.caname = this.character.lastName;
      }
      if (this.editForm.value.fname === '' || !this.editForm.value.fname) {
        this.editForm.value.fname = this.character.firstName;
      }
      if (!this.editForm.value.age) {
        this.editForm.value.age = this.character.age;
      }
      if (this.editForm.value.status === '') {
        this.editForm.value.status = this.character.status;
      }
      this.editCharacter(
        this.editForm.value.fname,
        this.editForm.value.caname,
        this.editForm.value.age,
        this.editForm.value.status,
        this.currentWorldId,
        this.character._id
      );
    }
    this.editModeEnd();
  }

  /* Load worlds */
  private loadWorlds() {
    this._dataService.fetchWorldEntries().subscribe(data => {
      this.worlds = data;
    }, error => {
      alert('Failed fetching worlds');
    });
  }

  /*All the getter functions fot the different entities*/
  private loadCharacters(worldID) {
    this._charaDataService.fetchCharacterEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = 'character';
      this.detailViewActivated = false;
      this.characters = data;
    }, error => {
      alert('Failed fetching characters');
    });
  }

  private loadCultures(worldID) {
    this._cultDataService.fetchCultureEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = 'culture';
      this.detailViewActivated = false;
      this.cultures = data;
    }, error => {
      alert('Failed fetching cultures');
    });
  }

  private loadCountries(worldID) {
    this._counDataService.fetchCountryEntries(worldID).subscribe(data => {
      this.selectedInputCharacteristic = 'country';
      this.detailViewActivated = false;
      this.countries = data;
    }, error => {
      alert('Failed fetching countries');
    });
  }

  /*Getter functions for specific entity by their ID*/
  private loadWorld(worldID) {
    this._dataService.fetchWorldEntry(worldID).subscribe(data => {
      this.selectedInputCharacteristic = 'world';
      this.world = data;
      this.detailViewActivated = true;
    }, error => {
      alert('Failed fetching this country');
    });
  }


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

  /*Delte functions for world attribute character*/
  private deleteCharacter(worldID, id) {
    this._charaDataService.deleteCharacter(worldID, id).subscribe(data => {
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i]._id === id) {
          this.characters.splice(i, 1);
        }
      }
    }, error => {
      alert('Failed deleting this character');
    });
  }

  private deleteWorld(worldID) {
    this._dataService.deleteWorld(worldID).subscribe(data => {
      this.deletedWorld.emit(worldID);
    }, error => {
      alert('Failed deleting this world');
    });
  }

  /* Update functions for characters and worlds */
  private editCharacter(firstname, lastname, age, status, worldID, id) {
    const newC = < Character > {};
    newC._id = id;
    newC.lastName = lastname;
    newC.firstName = firstname;
    newC.age = age;
    newC.status = status;
    newC.worldID = worldID;

    this._charaDataService.updateCharacter(newC).subscribe(data => {
      this.character = newC;
    }, error => {
      alert('Failed updating the character');
    });
  }

  private editWorld(name, status, id) {
    const newW = < World > {};
    newW.name = name;
    newW.WorkInProgress = status;
    newW._id = id;

    this._dataService.updateWorld(newW).subscribe(data => {
      console.log(data);
      this.world = newW;
    }, error => {
      alert('Failed updating this world');
    });
  }

  // Event handler to handle creation of new entities
  private onNewCharacter(newC: Character) {
    this.characters.push(newC[0]);
  }

  private onNewCulture(newC: Culture) {
    this.cultures.push(newC[0]);
  }

  private onNewCountry(newC: Country) {
    this.countries.push(newC[0]);
  }
}


