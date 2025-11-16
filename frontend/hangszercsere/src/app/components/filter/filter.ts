import { Component } from '@angular/core';
import { ListingService } from '../../services/listing-service/listing-service';
import { HomePage } from '../home-page/home-page';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  constructor(
    private ListingService: ListingService,
    private HomePage: HomePage,
  ) {}

  showExtra = false;

  filters: Filters = {
    category: '',
    priceType: '',     // 'less', 'more', 'custom'
    priceValue: null,  // For less/more
    priceMin: null,    // Custom range min
    priceMax: null,    // Custom range max
    condition: '',
    brand: '',
    model: '',
    location: '',
    aiRating: 0,
    dateType: '',      // 'before' or 'after'
    dateValue: ''      // Actual date
  };

  FilterListings() {
    this.ListingService.UploadFilters(this.filters);
    this.HomePage.FilterListings();
  }
}

export interface Filters {
  category: string;
  priceType: string;     // 'less', 'more', 'custom'
  priceValue: number;    // For less/more
  priceMin: number;      // Custom range min
  priceMax: number;      // Custom range max
  condition: string;
  brand: string;
  model: string;
  location: string;
  aiRating: number;
  dateType: string;      // 'before' or 'after'
  dateValue: string;     // Actual date
}
