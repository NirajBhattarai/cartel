import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('.roadmap__slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      rows: 0,
      variableWidth: true,
      prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="icon-arrow-left"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button"><i class="icon-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            infinite: true,
            variableWidth: false
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            infinite: true,
            variableWidth: false
          }
        },
        {
          breakpoint: 567,
          settings: {
            slidesToShow: 1,
            infinite: true,
            variableWidth: false
          }
        }
      ]
    });
  }

}
