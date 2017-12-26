import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CATEGORIES} from '../constants';
import {CODE} from '../constants';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
     styleUrls: ['register.component.scss'],
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    advisorCategories = CATEGORIES;
    model: any = {};
    loading = false;
    code = CODE;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

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
}
