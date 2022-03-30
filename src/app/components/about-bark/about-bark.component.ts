import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-bark',
  templateUrl: './about-bark.component.html',
  styleUrls: ['./about-bark.component.scss']
})
export class AboutBarkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToLink(url: string){
    window.open(url, "_blank");
}

}
