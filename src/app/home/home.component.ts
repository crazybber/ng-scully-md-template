import { Component, OnInit, HostListener } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { of, Observable } from 'rxjs';
import { MarkdownService } from 'ngx-markdown';
import { delay, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //#region markdown
  headers = 'this is head'; //require('raw-loader!./markdown/headers.md').default;
  // images = require('raw-loader!./markdown/images.md').default;
  // links = require('raw-loader!./markdown/links.md').default;
  // lists = require('raw-loader!./markdown/lists.md').default;
  //#endregion

  protected _titleIsAnimating = false;
  protected _pushpinIsOn = false;

  @HostListener('window:resize')
  onWindowResize() {
    this.initPushpin();
  }
  initPushpin() {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.animateTitle();
    this.animateScrollTop();
  }
  animateScrollTop() {
    throw new Error('Method not implemented.');
  }
  animateTitle() {
    throw new Error('Method not implemented.');
  }

  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.initMarkdown();
    this.initPushpin();
    this.initScrollSpy();
  }

  onPageUp() {
    // $('html, body').animate({ scrollTop: 0 }, {
    //   duration: 400,
    //   queue: false,
    //   easing: 'easeOutCubic',
    // });
  }
  initScrollSpy() {
    throw new Error('Method not implemented.');
  }
  initMarkdown() {
    throw new Error('Method not implemented.');
  }
}
