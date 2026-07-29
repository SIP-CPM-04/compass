import { QuarterlyGoal } from '../../core/store/quarterly-goal/quarterly-goal.model';
import { Hashtag } from '../../core/store/hashtag/hashtag.model';
export interface QuarterlyGoalData extends QuarterlyGoal {
  weeklyGoalsTotal: number;
  weeklyGoalsCompleted: number;
  hashtag: Hashtag;
}
