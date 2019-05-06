import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor() {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
   }

  ngOnInit() {

  }

}
