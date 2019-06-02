import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/models/SugarLevel';
import { OktaAuthService } from '@okta/okta-angular';
import { UserLogin } from '../shared/services/user-login.service';

@Component({
  selector: 'app-sugarlevel-edit',
  templateUrl: './sugarlevel-edit.component.html',
  styleUrls: ['./sugarlevel-edit.component.css']
})
export class SugarLevelEditComponent implements OnInit, OnDestroy {
  sugarLevel: SugarLevel = new SugarLevel();

  sub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private oktaAuth: OktaAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sugarLevelService: SugarLevelService,
    private userLogin: UserLogin
  ) {}

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
    console.log('IsAuth: '+this.isAuthenticated);
    if (!this.isAuthenticated){
     this.userLogin.setAuthenticationStatus(false);
      this.router.navigate(['']);
    }

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.sugarLevelService.get(id).subscribe((sugarLevel: any) => {
          if (sugarLevel) {
            this.sugarLevel = sugarLevel;
            this.sugarLevel.measuredAt = new Date(
              this.sugarLevel.measuredAt
            ).toISOString();
          } else {
            console.log(
              `Sugar Level with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/sugarlevel-list']);
  }

  save(form: any) {
    this.sugarLevelService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(id: number) {
    this.sugarLevelService.remove(id).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}