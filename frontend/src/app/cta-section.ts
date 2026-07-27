import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { RippleDirective } from './ripple.directive';
import { MagneticDirective } from './magnetic.directive';
import { ScrollProgressDirective } from './scroll-progress.directive';

/** Closing call to action: a desert dusk whose sun rises out of the dunes as you scroll. */
@Component({
  selector: 'app-cta-section',
  imports: [RouterLink, RevealOnScrollDirective, RippleDirective, MagneticDirective, ScrollProgressDirective],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {}
