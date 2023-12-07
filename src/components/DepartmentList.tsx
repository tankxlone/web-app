import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Department {
  department: string;
  sub_departments: string[];
}

const DepartmentList: React.FC = () => {
  const data: Department[] = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const handleDepartmentChange = (department: string) => {
    const selectedSubDepartments =
      data.find((item) => item.department === department)?.sub_departments ||
      [];

    if (selectedSubDepartments.length > 0) {
      const allSelected = selectedSubDepartments.every((subDepartment) =>
        selectedDepartments.includes(subDepartment)
      );

      setSelectedDepartments((prevState) =>
        allSelected
          ? prevState.filter((dep) => !selectedSubDepartments.includes(dep))
          : [...prevState, ...selectedSubDepartments]
      );
    } else {
      setSelectedDepartments((prevState) =>
        prevState.includes(department)
          ? prevState.filter((dep) => dep !== department)
          : [...prevState, department]
      );
    }
  };

  const toggleSubDepartments = (department: string) => {
    setExpandedDepartments((prevState) =>
      prevState.includes(department)
        ? prevState.filter((dep) => dep !== department)
        : [...prevState, department]
    );
  };

  const isDepartmentSelected = (department: string) => {
    const selectedSubDepartments =
      data.find((item) => item.department === department)?.sub_departments ||
      [];
    return selectedSubDepartments.every((subDepartment) =>
      selectedDepartments.includes(subDepartment)
    );
  };

  const isSubDepartmentSelected = (subDepartment: string) =>
    selectedDepartments.includes(subDepartment);

  return (
    <List>
      <h1>Department List</h1>
      {data.map((item) => (
        <div key={item.department}>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDepartmentSelected(item.department)}
                  onChange={() => handleDepartmentChange(item.department)}
                />
              }
              label={item.department}
            />

            {item.sub_departments.length > 0 && (
              <IconButton onClick={() => toggleSubDepartments(item.department)}>
                {expandedDepartments.includes(item.department) ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            )}
          </ListItem>

          {item.sub_departments.length > 0 && (
            <Collapse in={expandedDepartments.includes(item.department)}>
              <List component="div" disablePadding>
                {item.sub_departments.map((subDepartment) => (
                  <ListItem key={subDepartment} sx={{ pl: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSubDepartmentSelected(subDepartment)}
                          onChange={() => handleDepartmentChange(subDepartment)}
                        />
                      }
                      label={subDepartment}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
