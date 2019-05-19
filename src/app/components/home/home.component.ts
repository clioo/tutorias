import { Component } from '@angular/core';

import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(_afs:FirestoreFirebaseService) {
    
  }

}
