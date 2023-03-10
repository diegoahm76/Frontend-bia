import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';

// Generate Sales Data
const create_data: any = (time: string, amount?: number) => {
  return { time, amount };
};

const data = [
  create_data('00:00', 0),
  create_data('03:00', 300),
  create_data('06:00', 600),
  create_data('09:00', 800),
  create_data('12:00', 1500),
  create_data('15:00', 2000),
  create_data('18:00', 2400),
  create_data('21:00', 2400),
  create_data('24:00', undefined),
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Chart: React.FC = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
