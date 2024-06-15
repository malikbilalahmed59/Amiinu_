const disablePastDates = (date: any) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
export default disablePastDates;
