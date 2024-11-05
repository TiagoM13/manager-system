import dayjs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayjs.utc(date).hour(12).local().format('DD/MM/YYYY');
};

export const formatDateTime = (date: Date): string => {
  const formattedDate = dayjs(date);

  if (formattedDate.isSame(dayjs(), 'year')) {
    return formattedDate.format('D [de] MMMM [às] HH:mm');
  } else {
    return formattedDate.format('D [de] MMMM [de] YYYY [às] HH:mm');
  }
};

export const formatDateToISODate = (dateString: Date) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
};

export const formatAppointmentDate = (date: Date): string => {
  const formattedDate = dayjs
    .utc(date)
    .hour(12)
    .local()
    .format('D [de] MMMM, YYYY');
  const formattedTime = dayjs.utc(date).format('HH:mm A');

  return `${formattedDate} - ${formattedTime}`;
};

export const formattedTime = (date: Date) => dayjs.utc(date).format('HH:mm A');
