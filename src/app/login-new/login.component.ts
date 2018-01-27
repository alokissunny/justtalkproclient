import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthenticationService } from '../_services/index';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.scss'],
})

export class NewLoginComponent implements OnInit {
    model: any = {};
    user: User = new User();
    loading = false;
    returnUrl: string;
    content = `Sign Up Successful!!`;
    timeout = 1200;
    toastsLimit = 5;
    type = 'default';
    config: ToasterConfig;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private toasterService: ToasterService,
        private alertService: AlertService, private activeModal: NgbActiveModal) { }

    ngOnInit() {
        // reset login status
        this.model.isAdvisor = false;
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    private showToast(type: string, body: string) {
    const toast: Toast = {
      type: type,
      //  title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
    /* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/

    cambiar_login() {
        if (this.model.username && this.model.password)
            this.login();
        else {
            document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
            (document.querySelector('.cont_form_login') as any).style.display = "block";
            (document.querySelector('.cont_form_sign_up') as any).style.opacity = "0";

            setTimeout(function () { (document.querySelector('.cont_form_login') as any).style.opacity = "1"; }, 400);

            setTimeout(function () {
                (document.querySelector('.cont_form_sign_up') as any).style.display = "none";
            }, 200);
        }
    }

    cambiar_sign_up() {
        if (this.user.username && this.user.firstName && this.user.lastName && this.user.password) {
            this.signUp();
        }
        else {
            document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
            (document.querySelector('.cont_form_sign_up') as any).style.display = "block";
            (document.querySelector('.cont_form_login') as any).style.opacity = "0";

            setTimeout(function () {
                (document.querySelector('.cont_form_sign_up') as any).style.opacity = "1";
            }, 100);

            setTimeout(function () {
                (document.querySelector('.cont_form_login') as any).style.display = "none";
            }, 400);


        }
    }



    ocultar_login_sign_up() {

        document.querySelector('.cont_forms').className = "cont_forms";
        (document.querySelector('.cont_form_sign_up') as any).style.opacity = "0";
        (document.querySelector('.cont_form_login') as any).style.opacity = "0";

        setTimeout(function () {
            (document.querySelector('.cont_form_sign_up') as any).style.display = "none";
            (document.querySelector('.cont_form_login') as any).style.display = "none";
        }, 500);

    }
    signUp() {
        this.authenticationService.userSignUp(this.user).subscribe(res => {
            this.showToast(this.type,this.content);
            this.cambiar_login();
        });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, this.model.isAdvisor)
            .subscribe(
            data => {
                this.activeModal.close();
                this.authenticationService.onLogin.next({});
                this.router.navigate([this.returnUrl]);
            },
            error => {
                 this.showToast(this.type,"login failed");
                 this.model.username = '';
                 this.model.password = '';
            });
    }
}
