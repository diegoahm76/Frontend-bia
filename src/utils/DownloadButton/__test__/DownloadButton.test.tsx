/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadButton } from '../DownLoadButton';


describe('DownloadButton', () => {
  test('renders button and triggers download', () => {
    const fileUrl = 'https://example.com/file.pdf';
    const fileName = 'example.pdf';
    const condition = false;

    render(
      <DownloadButton fileUrl={fileUrl} fileName={fileName} condition={condition} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const downloadLink = screen.getByRole('link', { hidden: true }) as HTMLAnchorElement;
    expect(downloadLink.href).toBe(fileUrl);
    expect(downloadLink.download).toBe(fileName);
  });
});