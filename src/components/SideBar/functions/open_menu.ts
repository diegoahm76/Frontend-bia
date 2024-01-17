export const open_collapse = (key: number, set_permisos: any): void => {
  set_permisos((prevPermisos: any) =>
    prevPermisos.map((menu: any, index: number) =>
      index === key ? { ...menu, expanded: !menu.expanded } : menu
    )
  );
};


export  const open_collapse_sbm = (key_modulo: number, key_submenu: number, set_permisos: any): void => {
  set_permisos((prevPermisos: any) =>
    prevPermisos.map((modulo: any, moduloIndex: number) =>
      moduloIndex === key_modulo
        ? {
            ...modulo,
            menus: modulo.menus.map((menu: any, menuIndex: any) =>
              menuIndex === key_submenu
                ? { ...menu, expanded: !menu.expanded }
                : menu
            ),
          }
        : modulo
    )
  );
};

export   const open_collapse_sbm2 = (
  key_modulo: number,
  key_submenu: number,
  key_submenu2: number,
  set_permisos: any,
): void => {
  set_permisos((prevPermisos: any) =>
    prevPermisos.map((modulo: any, moduloIndex: number) =>
      moduloIndex === key_modulo
        ? {
            ...modulo,
            menus: modulo.menus.map((menu: any, menuIndex: any) =>
              menuIndex === key_submenu
                ? {
                    ...menu,
                    submenus: menu.submenus.map(
                      (submenu: any, submenuIndex: any) =>
                        submenuIndex === key_submenu2
                          ? { ...submenu, expanded: !submenu.expanded }
                          : submenu
                    ),
                  }
                : menu
            ),
          }
        : modulo
    )
  );
};

export  const open_collapse_sbm3 = (
  key_modulo: number,
  key_submenu: number,
  key_submenu2: number,
  key_submenu3: number,
  set_permisos: any,
): void => {
  set_permisos((prevPermisos: any) =>
    prevPermisos.map((modulo: any, moduloIndex: number) =>
      moduloIndex === key_modulo
        ? {
            ...modulo,
            menus: modulo.menus.map((menu: any, menuIndex: any) =>
              menuIndex === key_submenu
                ? {
                    ...menu,
                    submenus: menu.submenus.map(
                      (submenu: any, submenuIndex: any) =>
                        submenuIndex === key_submenu2
                          ? {
                              ...submenu,
                              submenus: submenu.submenus.map(
                                (submenu2: any, submenu2Index: any) =>
                                  submenu2Index === key_submenu3
                                    ? {
                                        ...submenu2,
                                        expanded: !submenu2.expanded,
                                      }
                                    : submenu2
                              ),
                            }
                          : submenu
                    ),
                  }
                : menu
            ),
          }
        : modulo
    )
  );
};