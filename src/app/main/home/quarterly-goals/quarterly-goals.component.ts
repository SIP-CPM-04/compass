import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsAnimations } from './quarterly-goals.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { QuarterlyGoalsItemComponent } from './quarterly-goals-item/quarterly-goals-item.component';
import { QuarterlyGoalsHeaderComponent } from './quarterly-goals-header/quarterly-goals-header.component';
import { QuarterlyGoal } from '../../../core/store/quarterly-goal/quarterly-goal.model';
import { QuarterlyGoalData } from '../home.model';
import { Hashtag } from '../../../core/store/hashtag/hashtag.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-quarterly-goals',
  templateUrl: './quarterly-goals.component.html',
  styleUrls: ['./quarterly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsAnimations,
  standalone: true,
  imports: [ QuarterlyGoalsItemComponent,
             QuarterlyGoalsHeaderComponent
  ],
})
export class QuarterlyGoalsComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  sampleData: WritableSignal<QuarterlyGoalData | null> = signal({
    __id: 'qg1',
    __userId: "testuser",
    __hashtagId: 'ht1',
    text: 'Finish cover letters',
    completed: false,
    order: 1,
    weeklyGoalsTotal: 3,
    weeklyGoalsCompleted: 2,
    hashtag: {
    __id: 'ht1',
    __userId: "testuser",
    name: 'coverletter',
    color: '#EE8B72',
    _deleted: false,
    }
  });

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  checkGoal(newCheckState: boolean) {
    if (newCheckState) {
      this.sampleData().weeklyGoalsCompleted -= 1
    }
    else {
      this.sampleData().weeklyGoalsCompleted += 1
    }
    this.snackBar.open(
      'Goal still to complete: ' + newCheckState,
      '',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      },
    );
  }
  
  modalClicked(newModalState: boolean) {
    this.snackBar.open(
      'Modal button clicked.',
      '',
      {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      },
    );
  }
  // --------------- OTHER -------------------------------

  constructor(
    private snackBar: MatSnackBar,
    private injector: Injector,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit(): void {
  }
}
