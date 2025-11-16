import { Component,OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat-service';
import { UserService } from '../../services/user-service/user-service';
import { ListingService,Listing } from '../../services/listing-service/listing-service';

@Component({
  selector: 'app-chat-component',
  standalone: false,
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css'
})
export class ChatComponent {

constructor(
  private ChatService: ChatService,
  private user: UserService,
  private ListingService: ListingService,
) {}

  chatter_id: number = 0;
  messages: any[] = [];
  threads: any[] = [];
  msg_content: string = '';
  listing_id: number = 0;
  listing: Listing = null;

  ngOnInit(): void {

    if(this.ChatService.current_listing != null)
    {
     this.listing = this.ChatService.current_listing;
     this.chatter_id = this.ChatService.current_listing.user_id;
     this.listing_id = this.ChatService.current_listing.id;
    }

    this.ChatService.GetAllMessages(this.user.currentUserId).subscribe(
      (data) => this.threads = data
    );

    if (this.chatter_id && this.listing_id) {
      this.GetMessages(this.listing_id);
    }

  }

SendMessage(): void {

  if (this.msg_content == '') return;

  this.ChatService.SendMessage(
    this.user.currentUserId,
    this.chatter_id,
    this.msg_content,
    this.listing_id
  ).subscribe({
    next: () => {
      this.msg_content = "";


      this.GetMessages(this.listing_id);
    },
    error: (err) => console.error(err)
  });
}

SetInfo(thread: any): void {
  this.chatter_id = thread.other_user_id;
  this.listing_id = thread.listing_id;
}


GetMessages(listing_id: number): void {

  this.ListingService.getListingById(listing_id).subscribe(data =>
  {
    this.listing = data;
  });

  this.ChatService.GetMessages(
    listing_id,            
    this.user.currentUserId
  ).subscribe(data => {
    this.messages = data;
  });
}

}
