import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {GetRolesService} from '../services/get-roles.service';

@Injectable()
export class DjGuard implements CanActivate{
  constructor(
    private rolesService:GetRolesService,
    private router:Router){

  }

  canActivate(){
    this.rolesService.setRoles();
    if(this.rolesService.checkRole('dj') || this.rolesService.checkRole('admin')){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
