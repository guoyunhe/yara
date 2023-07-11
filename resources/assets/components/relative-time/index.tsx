import { Box, Tooltip } from '@mui/material';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface RelativeTimeProps {
  date: string;
}

function RelativeTime({ date }: RelativeTimeProps) {
  const { i18n } = useTranslation();

  const relativeTimeFormatter = useMemo(
    () => new Intl.RelativeTimeFormat(i18n.language, { style: 'short' }),
    [i18n.language]
  );

  const fullDateTimeFormatter = useMemo(
    () => new Intl.DateTimeFormat(i18n.language, { dateStyle: 'full', timeStyle: 'full' }),
    [i18n.language]
  );

  const shortDateFormatter = useMemo(
    () => new Intl.DateTimeFormat(i18n.language, { dateStyle: 'short' }),
    [i18n.language]
  );

  const dateObj = useMemo(() => new Date(date), [date]);

  const fullDateTimeStr = useMemo(
    () => fullDateTimeFormatter.format(dateObj),
    [dateObj, fullDateTimeFormatter]
  );

  const relativeTimeStr = useMemo(() => {
    const diff = Date.now() - dateObj.getTime();

    let unit = 1000; // 1 second
    let period = 60 * unit; // 1 minute

    if (diff < period) {
      const seconds = Math.floor(diff / unit);
      return relativeTimeFormatter.format(-seconds, 'seconds');
    }

    unit *= 60; // 1 minute
    period = unit * 60; // 1 hour

    if (diff < period) {
      const minutes = Math.floor(diff / unit);
      return relativeTimeFormatter.format(-minutes, 'minutes');
    }

    unit *= 60; // 1 hour
    period *= 24; // 1 day

    if (diff < period) {
      const hours = Math.floor(diff / unit);
      return relativeTimeFormatter.format(-hours, 'hours');
    }

    unit *= 24; // 1 day
    period *= 30; // 1 month

    if (diff < period) {
      const days = Math.floor(diff / unit);
      return relativeTimeFormatter.format(-days, 'days');
    }

    return shortDateFormatter.format(dateObj);
  }, [dateObj, relativeTimeFormatter, shortDateFormatter]);

  return (
    <Tooltip title={fullDateTimeStr}>
      <Box component="span">{relativeTimeStr}</Box>
    </Tooltip>
  );
}

export default memo(RelativeTime);
