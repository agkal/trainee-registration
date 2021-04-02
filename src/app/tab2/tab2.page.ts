import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TraineeService } from '../trainee.service';
import { UsernameValidator } from '../validators/username.validator';
import { CountryPhone } from './country-phone.model';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  /**
 * Selected url for file path
 * @type {string}
 */
  url = "C:\Users\abdul\Downloads\ScoreSheet.xlsx";
  /**
   * submit alert variable
   * @type {boolean}
   */
  saveSubmit: boolean = false;

  addTrainee: FormGroup;


  /**
   * @constructor
   * @param {TraineeService} trainee - The trainee service.
   */
  constructor(private trainee: TraineeService) { }
  countries: Array<CountryPhone>;
  country_phone_group: FormGroup;

  ngOnInit(): void {
    this.countries = [
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('PK', 'Pakistan')
    ];
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });


    /**
    * Reactive form group
     * @type {FormGroup}
     */
    this.addTrainee = new FormGroup({
      course: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      passingYear: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern('[0-9]*'),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      university: new FormControl('', Validators.required),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])),
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      country_phone: this.country_phone_group,
    })
  }

  /**
   * Save register user data in service
   * @param {voud}
   * @return {void}
   */
  onSubmit(data) {

    this.trainee.saveTrainee(this.addTrainee.value).subscribe((result) => {
      console.warn("result is here:", result);
    });
    this.saveSubmit = true;
    console.log("data: ", this.addTrainee.value);
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'fullName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'university': [
      { type: 'required', message: 'University is required.' }
    ],
    'course': [
      { type: 'required', message: 'Course is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'passingYear': [
      { type: 'required', message: 'University is required.' },
      { type: 'maxlength', message: 'Passing Year must be four letters long' },
      { type: 'pattern', message: 'Your year must contain number.' }
    ],
    'city': [
      { type: 'required', message: 'City is required.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

}
