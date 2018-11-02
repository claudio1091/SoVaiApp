export default class Goal {
  constructor(initialData) {
    if (!initialData) initialData = {};

    this.userId = initialData.userId || '';
    this.name = initialData.name || '';
    this.dtGoal = initialData.dtGoal || new Date();
    this.status = initialData.status || 'open';
    this.dtCreate = new Date();
  }

  achievementDay(dtAchievement) {
    if (!this.daysAchievement) {
      this.daysAchievement = [];
    }

    this.daysAchievement.push(dtAchievement);
  }

  repeatInDays() {
    this.repeatIn = 'days';
  }

  repeatInWeeks() {
    this.repeatIn = 'weeks';
  }

  archive() {
    this.status = 'archived';
  }

  delete() {
    this.status = 'deleted';
  }

  done() {
    this.status = 'done';
  }

  inflate(data) {
    if (data.id) this.id = data.id;
    this.dtCreate = data.dtCreate || new Date();
    this.userId = data.userId || '';
    this.name = data.name || 'New Goal';
    this.dtGoal = data.dtGoal || new Date();
    this.repeatIn = data.repeatIn || 'days';
    this.notificationTime = data.notificationTime || new Date().setHours(9, 0);
    this.status = data.status || 'open';
    this.daysAchievement = data.daysAchievement || [];
    this.goalCategory = data.goalCategory || '';
  }
}
