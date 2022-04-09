import { UserService } from 'src/app/services/user.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoad = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.isLoad = true;
    this.userService.currentUser().subscribe({
      next: (response) => {
        console.log(response);
        this.isLoad = false;
      },
      error: (errors) => {},
    });
  }
}
