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

  //#region variable-binding
  markdown = `### Markdown example
    ---
    This is an **example** where we bind a variable to the \`markdown\` component that is also bind to a textarea.

    #### example.component.ts
    \`\`\`typescript
    public markdown = "# Markdown";
    \`\`\`

    #### example.component.html
    \`\`\`html
    <textarea [(ngModel)]="markdown"></textarea>
    <markdown [data]="markdown"></markdown>
    \`\`\``;
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
