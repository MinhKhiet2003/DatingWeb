import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  member: Member | undefined;
  user: User | undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
    if (this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private accountSevice: AccountService, private memberService: MembersService, private toastr: ToastrService){
    this.accountSevice.currentUser$.pipe(take(1)).subscribe(user => this.user = user || undefined);
  }
  ngOnInit() {
    // throw new Error('Function not implemented.');
    this.loadMember();
  }
  loadMember(){
    this.memberService.getMember(this.user?.userName || '').subscribe(member => {
      this.member = member;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('profile update successfully');
      this.editForm?.reset(this.member);
    })
  }
}


