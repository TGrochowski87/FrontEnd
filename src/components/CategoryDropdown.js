import React, { useState } from "react";
import { FormControl, Dropdown, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const CategoryDropdown = () => {
  const [value, setValue] = useState("");

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <FormControl
      autoFocus
      className="mx-3 my-2 w-auto category-input"
      ref={ref}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {/* <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          /> */}
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} drop="down">
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;
