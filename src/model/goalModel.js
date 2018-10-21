export default class Goal {
  constructor(userId, name, dtGoal, status = 'open') {
    this._userId = userId;
    this._name = name;
    this._dtGoal = dtGoal;
    this._status = status;
    this._dtCreate = new Date();
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set dtCreate(dtCreate) {
    this._dtCreate = dtCreate;
  }

  get dtCreate() {
    return this._dtCreate;
  }

  set userId(userId) {
    this._userId = userId;
  }

  get userId() {
    return this._userId;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase();
  }

  set dtGoal(dtGoal) {
    this._dtGoal = dtGoal;
  }

  get dtGoal() {
    return this._dtGoal;
  }

  set repeatIn(repeatIn) {
    this._repeatIn = repeatIn;
  }

  get repeatIn() {
    return this._repeatIn;
  }

  set notificationTime(notificationTime) {
    this._notificationTime = notificationTime;
  }

  get notificationTime() {
    return this._notificationTime;
  }

  set status(status) {
    this._status = status;
  }

  get status() {
    return this._status;
  }

  set daysAchievement(daysAchievement) {
    this._daysAchievement = daysAchievement;
  }

  get daysAchievement() {
    return this._daysAchievement;
  }

  achievementDay(dtAchievement) {
    if (!this._daysAchievement) {
      this._daysAchievement = [];
    }

    this._daysAchievement.push(dtAchievement);
  }

  repeatInDays() {
    this._repeatIn = 'days';
  }

  repeatInWeeks() {
    this._repeatIn = 'weeks';
  }

  archive() {
    this._status = 'archived';
  }

  delete() {
    this._status = 'deleted';
  }

  done() {
    this._status = 'done';
  }

  inflate(data) {
    if (data._id) this._id = data._id;
    if (data._dtCreate) this._dtCreate = data._dtCreate;
    if (data._userId) this._userId = data._userId;
    if (data._name) this._name = data._name;
    if (data._dtGoal) this._dtGoal = data._dtGoal;
    if (data._repeatIn) this._repeatIn = data._repeatIn;
    if (data._notificationTime) this._notificationTime = data._notificationTime;
    if (data._status) this._status = data._status;
    if (data._daysAchievement) this._daysAchievement = data._daysAchievement;
    if (data._goalCategory) this._goalCategory = data._goalCategory;
  }
}
