import { sortDateDown, humanizeDate, getRandomNumber } from './utills';

describe('Function: sortDateDown', () => {
  const datePast = 'Fri Aug 19 2022 11:43:04 GMT+0200 (CEST)';
  const dateFuture = 'Fri Aug 19 2022 11:45:04 GMT+0200 (CEST)';
  it('should return negative number', () => {
    expect(sortDateDown(datePast, dateFuture)).toBeLessThanOrEqual(0);
  });
  it('should return positive number', () => {
    expect(sortDateDown(dateFuture, datePast)).toBeGreaterThanOrEqual(0);
  });
});

describe('Function: humanizeDate', () => {
  const date = 'Fri Aug 19 2022 11:43:04 GMT+0200 (CEST)';
  it('should return humanize date', () => {
    expect(humanizeDate(date)).toBe('August 2022');
  });
});

describe('Function: getRandomNumber', () => {
  const min = 0;
  const max = 1;
  it('should return random number', () => {
    const randomNumber = getRandomNumber(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
