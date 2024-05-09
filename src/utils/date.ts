import dayjs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatDateTime = (date: Date): string => {
  const formattedDate = dayjs(date);

  if (formattedDate.isSame(dayjs(), 'year')) {
    return formattedDate.format('D [de] MMMM [às] HH:mm');
  } else {
    return formattedDate.format('D [de] MMMM [de] YYYY [às] HH:mm');
  }
};
