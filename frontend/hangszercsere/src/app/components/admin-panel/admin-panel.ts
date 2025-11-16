import { Component,OnInit } from '@angular/core';
import { Listing } from '../../services/listing-service/listing-service';
import { ListingService } from '../../services/listing-service/listing-service';
import { UserService } from '../../services/user-service/user-service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

  listings: Listing[] = [];

  constructor(
    private userservice: UserService,
    private listingservice: ListingService,
  ){

  }

  ngOnInit():void
  {
    this.listingservice.GetListings().subscribe((Data) => (this.listings = Data));
  }

  isAdmin(): boolean
  {
    return this.userservice.isAdmin();
  }

  RemoveListing(id:number): void
  {
    this.listingservice.RemoveListing(id).subscribe({
      next: (res) => {
          alert('Removed');
          this.listings = this.listings.filter(listing => listing.id !== id);
        },
        error: (err) => {
          alert('failed to remove');
          console.error('failed to remove', err);
        }});

  }
}
