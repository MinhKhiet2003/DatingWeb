import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class PreventUnsavedChangesGuard implements CanDeactivate<unknown>{
  
  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editForm?.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }

}
