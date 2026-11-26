import 'styled-components';

import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly colors: AppTheme['colors'];
    readonly fonts: AppTheme['fonts'];
    readonly space: AppTheme['space'];
    readonly radius: AppTheme['radius'];
  }
}
