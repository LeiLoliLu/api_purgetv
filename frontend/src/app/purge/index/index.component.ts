import { Component, OnInit } from '@angular/core';
import { PurgeService } from '../purge.service';
import { Purge } from '../purge';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { AuthService } from 'src/app/shared/auth.service';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isSignedIn!: boolean;    
  purges: Purge[] = [];
  loggedUser: any;
  image: string = "";

  serverURL="http://localhost:8000/";
    
  constructor(public purgeService: PurgeService,
    private auth: AuthStateService,
    private authService: AuthService,
    public router: Router,
    public token: TokenService) { }


  ngOnInit(): void {
    this.getUserLogged();
    this.purgeService.getAll().subscribe((data: Purge[])=>{
      this.purges = data;
      console.log(this.purges);
    })  
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
    
  deletePurge(id:number){
    this.purgeService.delete(id).subscribe(res => {
         this.purges = this.purges.filter(item => item.id !== id);
         console.log('Petition deleted successfully!');
    })
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
    console.log(this.loggedUser)
  }
}