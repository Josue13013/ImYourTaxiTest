import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GsapAnimationService } from '../../../../core/services/gsap-animation';

/**
 * 🎯 HeroSectionComponent (COMPLEJO)
 * Hero section principal con animaciones GSAP
 */
@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero-section.html'
})
export class HeroSectionComponent implements OnInit {
  private gsap = inject(GsapAnimationService);

  @ViewChild('heroContent', { static: false }) heroContent?: ElementRef;
  @ViewChild('heroImage', { static: false }) heroImage?: ElementRef;

  ngOnInit(): void {
    // Animaciones se ejecutarán después de que la vista se inicialice
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    if (!this.gsap.isInBrowser()) return;

    // Animate hero content con stagger
    if (this.heroContent) {
      const children = this.heroContent.nativeElement.children;
      this.gsap.staggerFadeIn(children, {
        duration: 0.8,
        stagger: 0.2
      });
    }

    // Parallax effect on hero image
    if (this.heroImage) {
      this.gsap.parallax(this.heroImage.nativeElement, 0.5);
    }
  }
}
