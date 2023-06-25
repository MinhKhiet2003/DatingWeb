import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  model: any = {}
  loggedIn: boolean | undefined;

  constructor(private accountService: AccountService){}
  ngOnInit(): void{
    this.getCurrentUser();
  }
  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      this.loggedIn = true;
    }, error => {
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    this.loggedIn = false;
  }
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }
}