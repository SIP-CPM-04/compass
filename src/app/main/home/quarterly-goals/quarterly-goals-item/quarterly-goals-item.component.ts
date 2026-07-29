import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector, OutputEmitterRef,  } from '@angular/core';
import { QuarterlyGoalsItemAnimations } from './quarterly-goals-item.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { QuarterlyGoal } from '../../../../core/store/quarterly-goal/quarterly-goal.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { QuarterlyGoalData } from '../../home.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-quarterly-goals-item',
  templateUrl: './quarterly-goals-item.component.html',
  styleUrls: ['./quarterly-goals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsItemAnimations,
  standalone: true,
  imports: [MatCheckbox],
})
export class QuarterlyGoalsItemComponent implements OnInit {
  check: OutputEmitterRef<boolean> = output<boolean>();
  // --------------- INPUTS AND OUTPUTS ------------------

  goal: Signal<QuarterlyGoalData> = input<QuarterlyGoalData>()
  /** The current signed in user. */
  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  isChecked: boolean = false;

  // --------------- COMPUTED DATA -----------------------

  
  // --------------- EVENT HANDLING ----------------------

  checkGoal() {
    this.isChecked = !this.isChecked;
    this.check.emit(this.isChecked);
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
