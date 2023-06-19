import { type FieldValues, type FieldErrors } from "react-hook-form";
import { validate_error } from "../validateErrorsForms";

    // Tests that the function returns true when all keys in keys_object have no errors with type 'required'
    it("test_all_keys_no_errors", async () => {
      const errors: FieldErrors<FieldValues> = {};
      const keys_object: string[] = ['key1', 'key2', 'key3'];
      const result = await validate_error(errors, keys_object);
      expect(result).toBe(true);
  });