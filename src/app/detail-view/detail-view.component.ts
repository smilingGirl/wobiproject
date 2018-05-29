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
import { ToastrService } from 'ngx-toastr';

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
  SharedService
} from '../services/shared.service';
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

  @Output() deletedWorld = new EventEmitter<number>();

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
    private toastr: ToastrService,
    private _sharedService: SharedService
  ) {
    this.route.params.subscribe( params => {
      this._selectedWorldId = params.id;
      this.loadWorld(this._selectedWorldId);
    });
    this._sharedService.changeEntityTypeEmitted$.subscribe( value => {
      this.selectedInputCharacteristic = value;
    });
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
    this.loadCountries(this._selectedWorldId);
    this.loadCultures(this._selectedWorldId);
  }

  private editModeEnd() {
    this.editMode = false;
  }

  private saveChanges(worldname, wip, countryname, system, culturename, charaname, charalname, age, status) {
    if (this.selectedInputCharacteristic === 'world') {
      if (this.editForm.value.wname === '') {
        this.editForm.value.wname = this.world.name;
      }
      this.editWorld(this.editForm.value.wname, this.editForm.value.wip, this._selectedWorldId);
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
      if (this.editForm.value.country === '') {
        this.editForm.value.country = this.character.country;
      }
      if (this.editForm.value.culture === '') {
        this.editForm.value.culture = this.character.culture;
      }
      this.editCharacter(
        this.editForm.value.fname,
        this.editForm.value.caname,
        this.editForm.value.age,
        this.editForm.value.status,
        this.editForm.value.culture,
        this.editForm.value.country,
        this._selectedWorldId,
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
      this.toastr.error('Failed fetching worlds!', 'Error');
    });
  }

  /*All the getter functions fot the different entities*/
  private loadEntity(entity, worldID) {
    this._sharedService.emitEntitiyChange(entity);
    this.detailViewActivated = false;
    if (entity === 'character') {
      this.loadCharacters(worldID);
    } else if (entity === 'culture') {
      this.loadCultures(worldID);
    } else if (entity === 'country') {
      this.loadCountries(worldID);
    }
  }

  private loadCharacters(worldID) {
    this._charaDataService.fetchCharacterEntries(worldID).subscribe(data => {
      this.characters = data;
    }, error => {
      this.toastr.error('Failed fetching characters!', 'Error');
    });
  }

  private loadCultures(worldID) {
    this._cultDataService.fetchCultureEntries(worldID).subscribe(data => {
      this.cultures = data;
    }, error => {
      this.toastr.error('Failed fetching cultures!', 'Error');
    });
  }

  private loadCountries(worldID) {
    this._counDataService.fetchCountryEntries(worldID).subscribe(data => {
      this.countries = data;
    }, error => {
      this.toastr.error('Failed fetching countries!', 'Error');
    });
  }

  /*Getter functions for specific entity by their ID*/
  private loadWorld(worldID) {
    this._dataService.fetchWorldEntry(worldID).subscribe(data => {
      this._sharedService.emitEntitiyChange('world');
      this.world = data;
      this.detailViewActivated = true;
    }, error => {
      this.toastr.error('Failed fetching this world!', 'Error');
    });
  }


  private loadCountry(worldID, id) {
    this._counDataService.fetchCountryEntry(worldID, id).subscribe(data => {
      this.country = data;
      this.detailViewActivated = true;
    }, error => {
      this.toastr.error('Failed fetching this country!', 'Error');
    });
  }

  private loadCulture(worldID, id) {
    this._cultDataService.fetchCultureEntry(worldID, id).subscribe(data => {
      this.culture = data;
      this.detailViewActivated = true;
    }, error => {
      this.toastr.error('Failed fetching this culture!', 'Error');
    });
  }

  private loadCharacter(worldID, id) {
    this._charaDataService.fetchCharacterEntry(worldID, id).subscribe(data => {
      this.character = data;
      this.detailViewActivated = true;
    }, error => {
      this.toastr.error('Failed fetching this character!', 'Error');
    });
  }

  /*Delte functions for world attribute character*/
  private deleteCharacter(worldID, id) {
    this._charaDataService.deleteCharacter(worldID, id).subscribe(data => {
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i]._id === id) {
          this.characters.splice(i, 1);
          this.detailViewActivated = false;
          this.toastr.success('Succesfully deleted this character!', 'Deleted!');
        }
      }
    }, error => {
      this.toastr.error('Failed deleting this character!', 'Error');
    });
  }

  private deleteWorld(worldID) {
    this._dataService.deleteWorld(worldID).subscribe(data => {
      this._sharedService.emitChange(worldID);
    }, error => {
      this.toastr.error('Failed deleting this world!', 'Error');
    });
  }

  /* Update functions for characters and worlds */
  private editCharacter(firstname, lastname, age, status, culture, country, worldID, id) {
    const newC = < Character > {};
    newC._id = id;
    newC.lastName = lastname;
    newC.firstName = firstname;
    newC.age = age;
    newC.status = status;
    newC.worldID = worldID;
    newC.country = country;
    newC.culture = culture;

    this._charaDataService.updateCharacter(newC).subscribe(data => {
      this.character = newC;
      this.toastr.success('Succesfully updated this character!', 'Updated!');
    }, error => {
      this.toastr.error('Failed updating the character!', 'Error');
    });
  }

  private editWorld(name, status, id) {
    const newW = < World > {};
    newW.name = name;
    newW.WorkInProgress = status;
    newW._id = id;

    this._dataService.updateWorld(newW).subscribe(data => {
      this.world = newW;
      this.toastr.success('Succesfully updated this world!', 'Update!');
    }, error => {
      this.toastr.error('Failed updating this world!', 'Error');
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


