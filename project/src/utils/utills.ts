import dayjs from 'dayjs';

export const sortDateDown = (taskA: string, taskB: string) => dayjs(taskA).diff(dayjs(taskB));

export const humanizeDate = (dueDate: string) => dayjs(dueDate).format('MMMM YYYY');
