/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { useModal1, useModal2, useModal3 } from './useModal';

it('test_defined_context', () => {
  const mockContext = {
    modal1: true,
    openModal1: jest.fn(),
    closeModal1: jest.fn()
  };
  jest.spyOn(React, 'useContext').mockReturnValue(mockContext);
  const result = useModal1();
  expect(result).toEqual({
    isOpen: true,
    open: expect.any(Function),
    close: expect.any(Function)
  });
});

it('test_defined_context', () => {
  const mockContext = {
    modal2: true,
    openModal2: jest.fn(),
    closeModal2: jest.fn()
  };
  jest.spyOn(React, 'useContext').mockReturnValue(mockContext);
  const result = useModal2();
  expect(result).toEqual({
    isOpen: true,
    open: expect.any(Function),
    close: expect.any(Function)
  });
});

it('test_defined_context', () => {
  const mockContext = {
    modal3: true,
    openModal3: jest.fn(),
    closeModal3: jest.fn()
  };
  jest.spyOn(React, 'useContext').mockReturnValue(mockContext);
  const result = useModal3();
  expect(result).toEqual({
    isOpen: true,
    open: expect.any(Function),
    close: expect.any(Function)
  });
});
