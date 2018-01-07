import { Router } from '@angular/router';
import { CATEGORIES } from '../constants';
import { CODE } from '../constants';
import { AlertService, UserService } from '../_services/index';
import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
    moduleId: module.id,
    styleUrls: ['register.component.scss'],
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    public searchControl: FormControl;
    advisorCategories = CATEGORIES;
    model: any = {};
    loading = false;
    code = CODE;
    place;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) { }

    register() {
        this.loading = true;
        this.userService.createAdvisor(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    ngOnInit() {
        this.model.category = "fin";
        //create search FormControl
        this.searchControl = new FormControl();
        //load Places Autocomplete
        // this.mapsAPILoader.load().then(() => {
        //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        //         types: ["address"]
        //     });
        //     autocomplete.addListener("place_changed", () => {
        //         this.ngZone.run(() => {
        //             //get the place result
        //             this.place= autocomplete.getPlace();

        //             //verify result
        //             if (this.place.geometry === undefined || this.place.geometry === null) {
        //                 return;
        //             }
        //         });
        //     });
        // });
         this.gender =  ['Male', 'Female', 'Others'];
    //Create a new user object
    this.user = new User({email:"", password: { pwd: "" , confirmPwd: ""}, gender: this.gender[0], terms: false});
    }
    //test
     //Property for the gender
  private gender: string[];
  //Property for the user
  private user:any;


     onFormSubmit({ value, valid}: { value: any, valid: boolean }) {
    	this.user = value;
    	this.user.password = this.user.password.pwd;
        // this.user.location = this.place.place_id;
        this.user.category = this.code[this.user.category];
         this.loading = true;
        this.userService.createAdvisor(this.user)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  	}
}
export class User {

    id: number;
    email: string;
    //Both the passwords are in a single object
	password: { 
	  pwd: string;
	  confirmPwd: string;
	};
	gender: string;
	terms: boolean;

	constructor(values: Object = {}) {
	  //Constructor initialization
      Object.assign(this, values);
  }

}
