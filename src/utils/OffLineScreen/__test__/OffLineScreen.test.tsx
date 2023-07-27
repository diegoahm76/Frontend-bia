/* eslint-disable @typescript-eslint/naming-convention */
import { render } from '@testing-library/react';
import { OfflineScreen } from '../OffLineScreen';

// Tests that the OfflineScreen component renders without errors
it('test_render_offline_screen', () => {
  render(<OfflineScreen />);
});

