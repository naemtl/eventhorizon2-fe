import { startOfWeek, addDays } from 'date-fns';

function getThisWeekend(today = new Date()) {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const friday = addDays(weekStart, 4);
  const sunday = addDays(weekStart, 7);

  return { friday, sunday };
}

function getNextWeekend(today = new Date()) {
    const weekStart = startOfWeek(addDays(today, 7), { weekStartsOn: 1 });
    const friday = addDays(weekStart, 4);
    const sunday = addDays(weekStart, 7);
  
    return { friday, sunday };
  }

export { getThisWeekend, getNextWeekend };