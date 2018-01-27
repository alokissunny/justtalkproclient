import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'advisor-login.html',
     styleUrls: ['./login.scss'],
})

export class AdvisorLoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService , private activeModal : NgbActiveModal) { }

    ngOnInit() {
        // reset login status
        // this.model.isAdvisor = false;
        // this.authenticationService.logout();

        // // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
     classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
 hasClass;
 addClass;
 removeClass;

// if ( 'classList' in document.documentElement ) {
//   hasClass = function( elem, c ) {
//     return elem.classList.contains( c );
//   };
//   addClass = function( elem, c ) {
//     elem.classList.add( c );
//   };
//   removeClass = function( elem, c ) {
//     elem.classList.remove( c );
//   };
// }
// else {
//   hasClass = function( elem, c ) {
//     return classReg( c ).test( elem.className );
//   };
//   addClass = function( elem, c ) {
//     if ( !hasClass( elem, c ) ) {
//       elem.className = elem.className + ' ' + c;
//     }
//   };
//   removeClass = function( elem, c ) {
//     elem.className = elem.className.replace( classReg( c ), ' ' );
//   };
// }

// function toggleClass( elem, c ) {
//   var fn = hasClass( elem, c ) ? removeClass : addClass;
//   fn( elem, c );
// }

// var classie = {
//   // full names
//   hasClass: hasClass,
//   addClass: addClass,
//   removeClass: removeClass,
//   toggleClass: toggleClass,
//   // short names
//   has: hasClass,
//   add: addClass,
//   remove: removeClass,
//   toggle: toggleClass
// };

// transport
// if ( typeof define === 'function' && define.amd ) {
//   // AMD
//   define( classie );
// } else {
//   // browser global
//   window.classie = classie;
// }

    // login() {
    //     this.loading = true;
    //     this.authenticationService.login(this.model.username, this.model.password, this.model.isAdvisor)
    //         .subscribe(
    //             data => {
    //                 this.activeModal.close();
    //                 this.authenticationService.onLogin.next({});
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
}
