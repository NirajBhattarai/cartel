import { Component, OnInit } from '@angular/core';
import { MintService } from 'src/app/service/mint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isConnected =false;
  constructor(private mintService: MintService) {

   }

  ngOnInit(): void {
    this.checkConnected()
  }

  connectToMetaMask(){
    this.mintService.connectToMetaMask();
  }

  checkConnected(){
    this.isConnected = this.mintService.checkWalletConnected();
  }

}
