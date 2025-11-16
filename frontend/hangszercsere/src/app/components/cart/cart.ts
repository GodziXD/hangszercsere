import { Component,OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart-service';
import { Listing } from '../../services/listing-service/listing-service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  constructor(
    private cart: CartService,

  ){};
  
  totalPrice: number = 0;
  listings: Listing[] = [];

  ngOnInit(): void
  {
    this.cart.LoadListings().subscribe(data =>{

      this.listings = data;
      console.log(this.listings)
          this.calculateTotal();
    });


  }
  
  removeFromCart(listing_id: number): void
  {
    this.cart.RemoveFromCart(listing_id);
  }

  calculateTotal() {

    for (let i = 0; i < this.listings.length; i++) {
      this.totalPrice += this.listings[i].price;
    }

  }

}
