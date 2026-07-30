import { Component, OnInit, Output, EventEmitter, inject, ChangeDetectionStrategy, output } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {getWeeklyDateRange} from 'src/app/core/utils/time.utils';

@Component({
  selector: 'app-weekly-goals-header',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './weekly-goals-header.component.html',
  styleUrls: ['./weekly-goals-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyGoalsHeaderComponent implements OnInit {
  dateRangeString: string = '';

  edit = output<boolean>();

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.dateRangeString = getWeeklyDateRange();
  }

  onEditClick(): void {
    this.snackBar.open('Opening Weekly Goals editor...', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    
    this.edit.emit(true);
  }
}