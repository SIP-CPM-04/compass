import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector, OutputEmitterRef } from '@angular/core';
import { QuarterlyGoalsHeaderAnimations } from './quarterly-goals-header.animations';
import { User } from 'src/app/core/store/user/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-quarterly-goals-header',
  templateUrl: './quarterly-goals-header.component.html',
  styleUrls: ['./quarterly-goals-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsHeaderAnimations,
  standalone: true,
  imports: [DatePipe],
})
export class QuarterlyGoalsHeaderComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  modal: OutputEmitterRef<boolean> = output<boolean>();

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  onModal: boolean = false;

  // --------------- COMPUTED DATA -----------------------
  time: Signal<Date> = toSignal(
    interval(1000).pipe(
      map(() => new Date())
    ),
    { initialValue: new Date() }
  );

  season: Signal<string> = computed(() => {
    const currentMonth = this.time().getMonth();
    switch (~~((currentMonth+1) / 3)) {
      case 0: return 'Winter';
      case 1: return 'Spring';
      case 2: return 'Summer';
      case 3: return 'Autumn';
      default: return 'Error';
    }
  });
  // --------------- EVENT HANDLING ----------------------
  modalClicked() {
    this.onModal = !this.onModal;
    this.modal.emit(this.onModal);
  }
  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit(): void {
  }
}
