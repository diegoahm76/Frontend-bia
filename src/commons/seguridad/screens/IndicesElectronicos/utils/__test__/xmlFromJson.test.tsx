import { xmlFromJson } from '../xmlFromJson';

describe('xmlFromJson', () => {
  it('test_simple_json', () => {
    const json = { name: 'John', age: 30 };
    const expected =
      '<?xml version="1.0"?>\n<root>\n  <name>John</name>\n  <age>30</age>\n</root>';
    expect(xmlFromJson(json)).toEqual(expected);
  });
  it('should handle boolean values', () => {
    const json = { name: true, age: false };
    const expected =
      '<?xml version="1.0"?>\n<root>\n  <name>true</name>\n  <age>false</age>\n</root>';
    expect(xmlFromJson(json)).toEqual(expected);
  });
  it('should handle numeric values', () => {
    const json = { name: 'John', age: 30.5 };
    const expected =
      '<?xml version="1.0"?>\n<root>\n  <name>John</name>\n  <age>30.5</age>\n</root>';
    expect(xmlFromJson(json)).toEqual(expected);
  });
});
