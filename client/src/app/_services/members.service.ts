import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = enviroment.apiUrl;
  member: Member [] = [];
  members: any;
  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string){
    const member = this.members.find((x: { username: string; }) => x.username === username);
    if (member !== undefined) return of(member);
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: any){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
        
      })
    );
  }
}
