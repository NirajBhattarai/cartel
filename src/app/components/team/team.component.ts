import { Component, OnInit } from '@angular/core';
import { NFTconstants } from 'src/app/constants/NFTconstants';
import { MintService } from 'src/app/service/mint.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public inputValue: number = 1
  public min = NFTconstants.min
  public max = NFTconstants.max
  public total = 1200
  public progress = 0
  public mintPrice = 0.08
  public totalPrice = 0.08

  public isConnected = false
  constructor(private mintService: MintService) {}

  async ngOnInit(): Promise<void> {
    this.checkConnected()
    await this.mintService.getTotal()
    this.progress = Number(
      (this.mintService.totalMinted / this.total).toFixed(2),
    )
  }

  isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return true
    } else {
      return false
    }
  }

  async connectToMetaMask() {
    if (this.isMobile()) {
      await this.mintService.connectWalletConnect()
      this.isConnected = true
    } else {
      await this.mintService.connectToMetaMask()
    }
  }

  checkConnected() {
    this.isConnected = this.mintService.checkWalletConnected()
  }

  onValueChange(val) {
    this.inputValue = val
    if (this.inputValue > 10) {
      this.inputValue = 10
    }
    this.totalPrice = this.mintPrice * this.inputValue
  }

  plus() {
    if (this.inputValue + 1 > this.max) {
      this.inputValue = this.max
      this.totalPrice = this.mintPrice * this.inputValue
      return
    }
    this.inputValue++
    this.totalPrice = this.mintPrice * this.inputValue
  }

  minus() {
    if (this.inputValue - 1 < this.min) {
      this.inputValue = this.min

      return
    }
    this.inputValue--
    this.totalPrice = this.mintPrice * this.inputValue
  }

  getMax() {
    this.inputValue = this.max
    this.totalPrice = this.mintPrice * this.inputValue
  }

  async mint() {
    if (this.isConnected) {
      if (this.isMobile()) {
        await this.mintService.mintFromWalletConnect(this.inputValue)
        this.mintService.getTotal()
        this.progress = Number(
          (this.mintService.totalMinted / this.total).toFixed(2),
        )
      } else {
        await this.mintService.mint(this.inputValue)
        this.mintService.getTotal()
        this.progress = Number(
          (this.mintService.totalMinted / this.total).toFixed(2),
        )
      }
    } else {
      this.connectToMetaMask()
    }
  }

}
