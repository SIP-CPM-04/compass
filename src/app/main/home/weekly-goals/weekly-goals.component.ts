import { Component } from '@angular/core';
import { WeeklyGoalsHeaderComponent } from './weekly-goals-header/weekly-goals-header.component';

@Component({
  selector: 'app-weekly-goals',
  standalone: true,
  imports: [WeeklyGoalsHeaderComponent],
  templateUrl: './weekly-goals.component.html',
  styleUrls: ['./weekly-goals.component.scss']
})
export class WeeklyGoalsComponent {
  goalsTitle = 'Weekly Goals';
  goalsDateRange = '9/24 - 9/30';

  constructor() {}

  openEditModal(isEditMode: boolean): void {
    console.log(`Edit action triggered! Is edit mode active: ${isEditMode}`);
  }
}