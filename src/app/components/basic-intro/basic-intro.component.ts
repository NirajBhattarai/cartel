import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-basic-intro',
  templateUrl: './basic-intro.component.html',
  styleUrls: ['./basic-intro.component.scss']
})
export class BasicIntroComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('.js-trigger-qa').click(function (e) {
      e.preventDefault();
      let elem = $(this);
      if (!elem.hasClass('active')) {
        elem.next().slideDown('fast');
        elem.find('i').removeClass('icon-plus').addClass('icon-minus')
        elem.addClass('active');
      } else {
        elem.next().slideUp('fast');
        elem.find('i').removeClass('icon-minus').addClass('icon-plus')
        elem.removeClass('active');
      }
    });
  }

}
