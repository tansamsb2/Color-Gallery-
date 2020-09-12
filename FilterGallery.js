import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

let input;
let color;

class FilterGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusItem: "",
      searchItem: ""
    };
    this.handleType = this.handleType.bind(this);
  }

  handleType() {
    const { listItem, handleSearchItem } = this.props;

    if (color.value === "All") {
      handleSearchItem(listItem);
    } else {
      let temp = [];
      let tempColor = color.value.toLowerCase();
      listItem.filter(data => {
        if (
          // x.color.toLowerCase().includes(input.value.toLowerCase()) &&
          data.color === tempColor
        ) {
          // console.log("color", data.color.toLowerCase());
          temp.push(data);
        }
      });
      // }
      handleSearchItem(temp);
    }
  }

  render() {
    const { placeholderValue } = this.props;
    return (
      <div className="d-flex">
        <select
          className="form-control"
          style={{ width: "inherit" }}
          ref={n => (color = n)}
          onChange={this.handleType}
          defaultValue="All"
        >
          <option selected value="All">
            All
          </option>
          <option selected value="Red">
            Red
          </option>
          <option selected value="Green">
            Green
          </option>
          <option selected value="Blue">
            Blue
          </option>
          <option selected value="Black">
            Black
          </option>
          <option selected value="Brown">
            Brown
          </option>
        </select>
      </div>
    );
  }
}

// FilterGallery.propTypes = {
//   // onSearch: PropTypes.func.isRequired
// };

export default FilterGallery;
