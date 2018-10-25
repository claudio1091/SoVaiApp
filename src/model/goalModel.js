export default class Goal {
  constructor(initialData) {
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
    if (data.dtCreate) this.dtCreate = data.dtCreate;
    if (data.userId) this.userId = data.userId;
    if (data.name) this.name = data.name;
    if (data.dtGoal) this.dtGoal = data.dtGoal;
    if (data.repeatIn) this.repeatIn = data.repeatIn;
    if (data.notificationTime) this.notificationTime = data.notificationTime;
    if (data.status) this.status = data.status;
    if (data.daysAchievement) this.daysAchievement = data.daysAchievement;
    if (data.goalCategory) this.goalCategory = data.goalCategory;
  }
}
