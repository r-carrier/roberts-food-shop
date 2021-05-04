import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // modify constructor with a parameter that declares a public messageService property
  // Angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
