import { get_item } from "../getItemFromLocalStorage";

    // Tests that the function returns the value of the key in localStorage if it exists and is valid
    it("test_happy_path_key_exists", () => {
      // Arrange
      const key = "existing_key";
      const value = "existing_value";
      localStorage.setItem(key, value);

      // Act
      const result = get_item(key);

      // Assert
      expect(result).toBe(value);
  });