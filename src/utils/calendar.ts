import moment, { Moment } from 'moment'

export type DayEntity = [string | number, boolean];

class Calendar {
  private today: Moment;
  private year: number;
  private month: number;
  private allDays: Moment[]
  private monthsPl = [
    ['Styczeń', 'St'],
    ['Luty', 'Lu'],
    ['Marzec', 'Mrz'],
    ['Kwiecień', 'Kw'],
    ['Maj', 'Maj'],
    ['Czerwiec', 'Cz'],
    ['Lipiec', 'Lip'],
    ['Sierpień', 'Sier'],
    ['Wrzesień', 'Wrz'],
    ['Październik', 'Paź'],
    ['Listopad', 'Lis'],
    ['Grudzień', 'Gr'],
  ];

  constructor() {
    this.today = moment().clone();
    this.month = this.today.month() + 1;
    this.year = this.today.year();
    this.allDays = [];
  }

  prevMonth = () => {
    this.month--;

    if (this.month === 0) {
      this.month = 12;
      this.year--;
    }
  }

  nextMonth = () => {
    this.month++;
    if (this.month === 12) {
      this.month = 1;
      this.year++;
    }
  }

  private setDaysOfMonth = () => {
    const myDate = `${this.year}-${this.month}-01`;
    const firstDayOfWeek = moment(myDate).clone().startOf('month').day(1);
    const daysInMonth = moment(myDate).daysInMonth();
    const lastDayOfMonth = moment(`${this.year}-${this.month}-${daysInMonth}`).clone().add(1, 'days');
    this.allDays = [];

    let addDate = false;
    let i = 0;

    do {
      const nextDateObj = firstDayOfWeek.clone().add(i++, 'd');
      addDate = nextDateObj.isBefore(lastDayOfMonth);

      if (addDate) this.allDays.push(nextDateObj);
    } while (addDate);

  }

  getDaysArr = (): DayEntity[] => {
    this.setDaysOfMonth();

    const firsDayOfMonth = moment(`${this.year}-${this.month}-01`);
    const days: DayEntity[] = [];

    for (const day of this.allDays) {
      if (day.isBefore(firsDayOfMonth)) {
        days.push(['', false]);
      } else {
        days.push([day.date(), day.isSame(this.today, 'date')]);
      }
    }

    return days;
  }

  getDay = (): number => this.today.date();
  getMonthName = (): string => this.monthsPl[this.month - 1][0];
  getMonthSort = (): string => this.monthsPl[this.month - 1][1];
  getYear = (): string => this.year.toString().slice(-2);

}

export const calendar = new Calendar()