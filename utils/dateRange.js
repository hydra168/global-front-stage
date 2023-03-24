import { format, subDays } from 'date-fns';

export const dateRange = {
  inputProps: {
    outline: true,
    label: '选择时间段',
    'background-color': '#f5f5f5',
    style: {
      width: '100%',
    },
  },
  menuProps: {
    offsetY: true,
    closeOnContentClick: false,
    style: {
      width: '100%',
    },
  },
  presets: [
    {
      label: 'today',
      range: [format(new Date(), 'YYYY-MM-DD'), format(new Date(), 'YYYY-MM-DD')],
    },
    {
      label: 'yesterday',
      range: [format(subDays(new Date(), 1), 'YYYY-MM-DD'), format(subDays(new Date(), 1), 'YYYY-MM-DD')],
    },
    {
      label: '30days',
      range: [format(subDays(new Date(), 30), 'YYYY-MM-DD'), format(subDays(new Date(), 1), 'YYYY-MM-DD')],
    },
  ],
};
