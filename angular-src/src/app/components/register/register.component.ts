import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  password_conf: String;

  constructor(
    private validateService : ValidateService,
    private flashMessages: FlashMessagesService,
    private authService : AuthService,
    private router : Router
   ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
   
     const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    
    //Szükséges mezők
      if(!this.validateService.validateRegister(user)){
        this.flashMessages.show('Minden mezőt ki kell tölteni!', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
      if(!this.validateService.validateEmail(user.email)){   
        this.flashMessages.show('Nem érvényes email cím!', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
      if(!this.validateService.validatePassword(user.password, this.password_conf)){
        this.flashMessages.show('A két jelszó nem egyezik!', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
      //User regisztrációja
      this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          this.flashMessages.show('Regisztrálva vagy és be tudsz jelentkezni.', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessages.show('Valami nem jó :(', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      })
  }


}
