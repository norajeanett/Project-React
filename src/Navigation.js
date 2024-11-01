import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";


export function Navigation({ activePage, activePageHandler }) {
  return (
    <Menu>
        <MenuItem
        label="Schools"
        active={activePage === "Schools"} 
        onClick={() => activePageHandler("Schools")}
      />
        <MenuItem
          label="New Inspection"
          active={activePage === "NewInspection"} 
          onClick={() => activePageHandler("NewInspection")}
      />
        <MenuItem
          label="New School"
          active={activePage === "NewSchool"} 
          onClick={() => activePageHandler("NewSchool")}
      />
    </Menu>
  );
}
