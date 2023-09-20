/* eslint-disable @typescript-eslint/naming-convention */
/*import { render, fireEvent } from '@testing-library/react';
import { CheckboxComponent } from '../CheckboxComponent';


describe('CheckboxComponent', () => {
  it('renders correctly with default props', () => {
    const { getByLabelText, getByTitle } = render(
      <CheckboxComponent checked={false} handleChange={() => {}} />
    );

    const checkbox = getByLabelText('Seleccionar item');
    expect(checkbox).not.toBeChecked();

    const infoIcon = getByTitle('desmarcado');
    expect(infoIcon).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    const { getByLabelText, getByTitle } = render(
      <CheckboxComponent
        checked={true}
        title1="custom title 1"
        title2="custom title 2"
        handleChange={() => {}}
      />
    );

    const checkbox = getByLabelText('Seleccionar item');
    expect(checkbox).toBeChecked();

    const infoIcon = getByTitle('custom title 1');
    expect(infoIcon).toBeInTheDocument();
  });

  it('calls handleChange function when checkbox is clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <CheckboxComponent checked={false} handleChange={handleChange} />
    );

    const checkbox = getByLabelText('Seleccionar item');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
}); */