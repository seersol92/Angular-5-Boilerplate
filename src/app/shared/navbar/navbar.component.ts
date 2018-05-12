import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public userName: string = null;
    constructor(
        private api: ApiService,
        private auth: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }

  ngOnInit(
  ) {
    this.userName = this.auth.getUser().username;
  }

  logout() {
    this.auth.logout();
    this.toastr.info(
        'Logging off account!!',
        'Info', {
            timeOut: 2500
    });
    setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // redirect after 3 sec
    }
}
