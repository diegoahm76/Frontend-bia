/* eslint-disable @typescript-eslint/naming-convention */

import { Parser } from "../parser";

    // Tests that parse method returns object with keys and values properties for input string with valid format
    it("test_parse_valid_string", () => {
      const parser = new Parser();
      const input = "key1:value1|key2:value2|key3:value3";
      const expectedOutput = {
          objeto: {
              key1: "value1",
              key2: "value2",
              key3: "value3"
          },
          keys: ["key1", "key2", "key3"],
          values: ["value1", "value2", "value3"]
      };
      const output = parser.parse(input);
      expect(output).toEqual(expectedOutput);
  });