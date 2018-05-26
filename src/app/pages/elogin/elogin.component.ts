import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthenticationService } from '../../_services/index';
import { UserService } from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as constant from '../../constants';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'elogin.component.html',
    styleUrls: ['./elogin.scss'],
})

export class eLoginComponent implements OnInit {
    model: any = {};
    loginmodel: any = {};
    loading = false;
    returnUrl: string;
    content = `SignUp Successful!!`;
    contentFail = 'Email already taken';
    timeout = 1200;
    toastsLimit = 5;
    type = 'default';
    config: ToasterConfig;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;
    isSignUp = true;
    // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private route: ActivatedRoute, private userService: UserService,
        private router: Router, private toasterService: ToasterService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService, private activeModal: NgbActiveModal) { }

    ngOnInit() {
        // reset login status
        // this.model.isAdvisor = false;
        // this.authenticationService.logout();

        // // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    user() {
        this.router.navigateByUrl('/login');
    }
    switchInterface(val) {
        this.isSignUp = !val;
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
    signUp(form: NgForm) {
        //  if (form.invalid) {
        //      return;
        // }
        if (this.validation()) {
            this.model.email = this.model.username;
            this.model.currentRating = constant.BASE_RATE;
            this.model.rateCount = constant.BASE_RATE_COUNT;
            this.userService.createAdvisor(this.model)
                .subscribe(
                data => {
                    this.showToast(this.type, this.content);
                    this.isSignUp = false;
                },
                error => {
                    this.showToast(this.type, this.contentFail);
                                        this.loading = false;
                });
        }
    }
    validation() {
        if (this.model && this.model.username && this.model.firstName && this.model.lastName)
            return true;
        else
            return false;
    }
    classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    login() {
        if (this.loginmodel.username && this.loginmodel.password) {
            this.authenticationService.login(this.loginmodel.username,
                this.loginmodel.password, true).subscribe(
                data => {
                    this.showToast(this.type, 'login success');
                      this.authenticationService.onLogin.next({});
                    this.router.navigate(['/']);
                },
                error => {
                    this.showToast(this.type, 'login fail');
                }
                )
        }
    }



}
