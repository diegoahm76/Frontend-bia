import { validate_password } from "../ValidateFormatPassword";

    // Tests that a valid password with exactly 8 characters returns true
    it("test_valid_password_with_8_characters", () => {
      expect(validate_password("Abc12345q85")).toBe(false);
  });

  it("test_valid_password_with_8_characters", () => {
    expect(validate_password("Admin#1234")).toBe(true);
});