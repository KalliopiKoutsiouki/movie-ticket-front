import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../services/user-role.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  updateUserRole(user: User, role: string): void {
    const hasRole = user.userRoles.includes(role);

    if (hasRole) {
      this.userRoleService.removeUserRole(user.id, role).subscribe(() => {
        user.userRoles = user.userRoles.filter(r => r !== role);
      });
    } else {
      this.userRoleService.addUserRole(user.id, role).subscribe(() => {
        user.userRoles.push(role);
      });
    }
  }

}
