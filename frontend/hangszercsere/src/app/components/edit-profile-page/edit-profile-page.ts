import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-page',
  standalone: false,
  templateUrl: './edit-profile-page.html',
  styleUrl: './edit-profile-page.css'
})
export class EditProfilePage {

  user: any | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  
selectedAvatar: File | null = null;

onSelectAvatar(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files?.length) this.selectedAvatar = files[0];
}

uploadAvatar() {
  if (!this.selectedAvatar) return alert('Select a file!');

  const formData = new FormData();
  formData.append('avatar', this.selectedAvatar);
  formData.append('userId', this.userService.getUserId().toString());

  this.userService.uploadAvatar(formData).subscribe({
    next: (res) => {
      console.log('Avatar updated', res);
      this.user.profile_url = res.filename;
    },
    error: (err) => {
      console.error('Upload failed', err);
      alert('Upload failed: ' + (err.error?.error || 'Unknown error'));
    }
  });
}

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!userId) return;

    this.userService.GetUser(userId).subscribe({
      next: (data) => {
        if (data.id !== this.userService.getUserId()) {
          alert("You can't edit someone else's profile!");
          return;
        }
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user', err);
      }
    });
  }

ChangePassword() {
  if((this.newPassword != this.confirmPassword) && this.confirmPassword != '') {
    alert("New passwords don't match!");
    return;
  }
}

  UpdateProfile() {

    //login user to verify
    if(this.newPassword != '')
    {
      this.userService.LoginUser(this.user.name,this.currentPassword).subscribe({

        next: (res: any) => {

            },
            error: (err) => {
              let msg = "Unkown error";
              if (err && err.error && err.error.error) {
                msg = err.error.error;
              }
              alert("Login failed: " + msg);
              return;
            }
          });
    }

  
    this.userService.UpdateUser(this.user.id,this.user.name,this.user.email,this.user.bio,this.user.location,this.newPassword).subscribe({
    next: (res) => {
      console.log('Profile updated', res);
      alert('🎉Profile updated!');
      window.location.reload();
    },
    error: (err) => {
      console.error('Profile update failed', err);
      alert('failed: ' + (err.error?.error || 'Unknown error'));
    }
  });
  }
  
}
