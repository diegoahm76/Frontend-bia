import { Page404 } from '../404';
import { render } from '@testing-library/react';

// Tests that the component renders without errors
it('test_rendering_without_errors', () => {
  render(<Page404 />);
});
