import { Directive, ElementRef, Input, Renderer, HostBinding, Attribute, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../core/auth.service';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit, OnDestroy {

  @Input() appShowAuthed: boolean;
  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  ngOnInit() {
    this.sub = this.authService.currentUser.subscribe( res => {
      if (res) {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }

      } else {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
