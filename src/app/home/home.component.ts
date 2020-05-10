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
  headers = require('raw-loader!../markdown/headers.md').default;
  emphasis = require('raw-loader!../markdown/emphasis.md').default;
  images = require('raw-loader!../markdown/images.md').default;
  markdown = require('raw-loader!../markdown/binding-variable.md').default;

  protected _titleIsAnimating = false;
  protected _pushpinIsOn = false;

  @HostListener('window:resize')
  onWindowResize() {
    this.initPushpin();
  }

  private initPushpin() {
    const tableOfContent = $('.table-of-contents');
    // add pushpin
    if (!this._pushpinIsOn && window.innerWidth > 992) {
      const pushpinTop = tableOfContent.parent().offset().top;
      tableOfContent.pushpin({ top: pushpinTop });
      this._pushpinIsOn = true;
    }
    // remove pushpin
    if (this._pushpinIsOn && window.innerWidth <= 992) {
      tableOfContent.pushpin('remove' as any);
      this._pushpinIsOn = false;
    }
  }

  private initScrollSpy() {
    $('section').scrollSpy();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.animateTitle();
    this.animateScrollTop();
  }

  private animateScrollTop() {
    const scrollTop = $('.fixed-action-btn button');
    const windowOffset = window.pageYOffset;
    const hasScaleInClass = scrollTop.hasClass('scale-in');
    const targetScaleInClass = windowOffset > 100 ? true : false;
    // scale-in
    if (!hasScaleInClass && targetScaleInClass) {
      scrollTop.addClass('scale-in');
      of(null)
        .pipe(
          tap(() => scrollTop.addClass('pulse')),
          delay(1000),
          tap(() => scrollTop.removeClass('pulse')),
          first()
        )
        .subscribe();
    }
    // scale-out
    if (hasScaleInClass && !targetScaleInClass) {
      scrollTop.removeClass('scale-in');
    }
  }

  private animateTitle() {
    const title = $('.title a');
    const titleOffset = title[0].offsetTop;
    const windowOffset = window.pageYOffset;
    const currentFontSize = title[0].style.fontSize;
    const targetFontSize = windowOffset > titleOffset ? '2.28rem' : '2.92rem';

    if (currentFontSize !== targetFontSize && !this._titleIsAnimating) {
      title.animate(
        { fontSize: targetFontSize },
        {
          duration: 200,
          queue: false,
          easing: 'easeOutCubic',
          start: () => (this._titleIsAnimating = true),
          complete: () => (this._titleIsAnimating = false),
        }
      );
    }
  }

  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.initMarkdown();
    this.initPushpin();
    this.initScrollSpy();
  }

  onPageUp() {
    $('html, body').animate(
      { scrollTop: 0 },
      {
        duration: 400,
        queue: false,
        easing: 'easeOutCubic',
      }
    );
  }

  private initMarkdown() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return (
        '<h' +
        level +
        '>' +
        '<a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '">' +
        '<span class="header-link"></span>' +
        '</a>' +
        text +
        '</h' +
        level +
        '>'
      );
    };
  }
}
