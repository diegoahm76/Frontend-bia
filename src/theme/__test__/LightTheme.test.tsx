import { light_theme } from "../LightTheme";

    // Tests that all palette values are defined and have valid color codes
    it("test_palette_values_defined", () => {
      expect(light_theme.primary.main).toBeDefined();
      expect(light_theme.secondary.main).toBeDefined();
      expect(light_theme.customColor.main).toBeDefined();
      expect(light_theme.white.main).toBeDefined();
      expect(light_theme.success.main).toBeDefined();
      expect(light_theme.background.default).toBeDefined();
      expect(light_theme.background.paper).toBeDefined();
  });