import { addDays, startOfWeek } from 'date-fns';

function getThisWeekend(today = new Date()) {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisFriday = addDays(weekStart, 4);
  const thisSunday = addDays(weekStart, 7);

  return { thisFriday, thisSunday };
}

function getNextWeekend(today = new Date()) {
  const weekStart = startOfWeek(addDays(today, 7), { weekStartsOn: 1 });
  const nextFriday = addDays(weekStart, 4);
  const nextSunday = addDays(weekStart, 7);

  return { nextFriday, nextSunday };
}

export { getNextWeekend, getThisWeekend };
