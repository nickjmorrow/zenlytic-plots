import colors from './colors';

export const SCALE_TYPES = {
  UTC: 'UTC',
};

export const PLOT_MARGIN = {
  top: 10,
  left: 65,
  bottom: 40,
  right: 30,
};

export const DEFAULT_PLOT_MARGIN = {
  top: 40,
  left: 32,
  bottom: 40,
  right: 48,
};

export const DEFAULT_Y_AXIS_WIDTH = 80;
export const DEFAULT_X_AXIS_HEIGHT = 40;

export const DEFAULT_BAR_Y_AXIS_WIDTH = 120;
export const DEFAULT_FUNNEL_X_AXIS_HEIGHT = 10;
export const DEFAULT_WATERFALL_X_AXIS_HEIGHT = 10;

export const DEFAULT_LABEL_PROPS = {
  style: { textAnchor: 'middle' },
  fill: '#595959',
  fontWeight: 500,
  fontSize: '0.75rem',
};

export const DEFAULT_TICK_PROPS = {
  fill: '#8C8C8C',
  fontWeight: 300,
  fontSize: '0.75rem',
};

export const DEFAULT_AXIS_COLOR = '#A6A6A6';

export const DEFAULT_CARTESIAN_GRID_COLOR = '#F0F0F0';

export const PLOT_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  LINE_COHORT: 'line_cohort',
  TABLE_ONLY: 'table_only',
  SCATTER: 'scatter',
  STAT: 'stat_plot',
};

export const AXIS_TYPES = {
  DATE: 'date',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
};

export const COLOR_SUCCESS = colors.green[600];
export const COLOR_FAIL = colors.red[600];

export const DATE_AXIS_TYPES = [
  AXIS_TYPES.DATE,
  AXIS_TYPES.WEEK,
  AXIS_TYPES.MONTH,
  AXIS_TYPES.QUARTER,
  AXIS_TYPES.YEAR,
];

export const PLOT_COLOR_PALETTE = {
  RED_MARK: 'red',
  GREEN_MARK: 'green',
  YELLOW_MARK: 'yellow',
  DARK_BLUE_MARK: 'blue',
  ORANGE_MARK: 'orange',
  PINK_MARK: 'pink',
  LIGHT_BLUE_MARK: 'lightblue',
};

export const PLOT_COLORS = [
  colors.dark_blue[300],
  colors.mint[300],
  colors.red[300],
  colors.green[300],
  colors.orange[300],
  colors.pink[300],
  colors.light_blue[300],
  colors.yellow[300],
];

export const AXIS_COLOR = '#A6A6A6';
export const GRID_COLOR = '#F0F0F0';
export const LABEL_COLOR = '#737373';

export const HIGHTLIGHT_BAR_COLOR = colors.gray[30];
