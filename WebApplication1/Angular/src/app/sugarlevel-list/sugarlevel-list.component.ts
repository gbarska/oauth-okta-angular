import { Component, OnInit } from '@angular/core';
import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/models/SugarLevel';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from '../shared/services/user-login.service';

@Component({
  selector: 'app-sugarlevel-list',
  templateUrl: './sugarlevel-list.component.html',
  styleUrls: ['./sugarlevel-list.component.css']
})

export class SugarLevelListComponent implements OnInit {
  sugarLevels: Array<SugarLevel>;
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
        this.userLogin.setAuthenticationStatus(true);
        console.log(this.userLogin.getAuthenticationStatus());
        this.router.navigate(['']);
      }
      else{
        this.sugarLevelService.getAll().subscribe(data => {
          let example = data[0] as SugarLevel;
          console.log('thik we fetched...'+example.description);
          this.sugarLevels = data;
        },
        (error) => {
          console.log(error);
        } // error path
        );

      }
 
  }
}