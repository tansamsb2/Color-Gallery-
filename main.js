// Get component and library
import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import $ from "jquery";
import _ from "lodash";
import Gallery from "react-grid-gallery";
// import Gallery from "./public/assets/Gallery";
import CheckButton from "./public/assets/CheckButton";
import FilterGallery from "./FilterGallery";

function constructDataImage(params) {
  const tempData = [];
  params &&
    params.length > 0 &&
    params.map(val => {
      tempData.push(Object.assign(val, { src: val.image || "" }));
    });
  return tempData;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      selectAllChecked: false,
      checked: [],
      isListView: false,
      listItem: [],
      filteredListItem: [],
      filteredListItemReform: [],
      isOpen: false
    };
    this.onSelectImage = this.onSelectImage.bind(this);
    this.getSelectedImages = this.getSelectedImages.bind(this);
    this.onClickSelectAll = this.onClickSelectAll.bind(this);
  }

  //   First call of the color list
  componentDidMount() {
    const { images } = this.props;
    const itemList = images;
    const filteredListItemReform =
      itemList &&
      itemList.reduce((acc, data) => {
        acc.push({
          src: data.src,
          thumbnail: data.thumbnail,
          color: data.color
          //   caption: data.name,
          //   customOverlay: data.name,
          //   thumbnailCaption: data.name,
        });
        return acc;
      }, []);
    // console.log("filteredListItemReform", filteredListItemReform);
    this.setState({
      listItem: filteredListItemReform,
      filteredListItem: filteredListItemReform
    });
  }

  //After color filter been choosen then the result update the color list
  componentWillReceiveProps(nextProps) {
    const { images } = this.props;
    const { filteredListItem } = this.state;

    if (filteredListItem !== nextProps.filteredListItem) {
      const itemList = filteredListItem;
      const filteredListItemReform =
        itemList &&
        itemList.reduce((acc, data) => {
          acc.push({
            src: data.src,
            thumbnail: data.thumbnail,
            color: data.color
            // caption: data.name,
            // customOverlay: data.name,
            // thumbnailCaption: data.name,
          });
          return acc;
        }, []);
      // }
      console.log("filteredListItemReform nextProps", filteredListItemReform);
      this.setState({
        listItem: filteredListItemReform,
        filteredListItem: filteredListItemReform
      });
    }
  }

  allImagesSelected(images) {
    var f = images.filter(function(img) {
      return img.isSelected == true;
    });
    return f.length == images.length;
  }

  setCustomTags(i) {
    return i.tags.map(t => {
      return (
        <div key={t.value} style={customTagStyle}>
          {t.title}
        </div>
      );
    });
  }

  onSelectImage(index, image) {
    const element = document.querySelector(".ReactGridGallery_tile-viewport");
    element.style.margin = "0 !important";
    var images = this.state.filteredListItem.slice();
    var img = images[index];
    if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    this.setState({
      images: images
    });

    if (this.allImagesSelected(images)) {
      this.setState({
        selectAllChecked: true
      });
    } else {
      this.setState({
        selectAllChecked: false
      });
    }

    const { checked } = this.state;
    const currentIndex = checked.indexOf(image);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(image);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ checked: newChecked });
  }

  getSelectedImages() {
    var selected = [];
    for (var i = 0; i < this.state.images.length; i++)
      if (this.state.images[i].isSelected == true)
        selected.push(this.state.images[i].src);
    return selected;
  }

  onClickSelectAll() {
    var selectAllChecked = !this.state.selectAllChecked;
    this.setState({
      selectAllChecked: selectAllChecked
    });

    var images = this.state.filteredListItem.slice();
    if (selectAllChecked) {
      this.setState({ checked: this.state.filteredListItem });
      for (var i = 0; i < this.state.filteredListItem.length; i++)
        images[i].isSelected = true;
    } else {
      this.setState({ checked: [] });
      for (var i = 0; i < this.state.filteredListItem.length; i++)
        images[i].isSelected = false;
    }
    this.setState({
      images: images
    });
  }

  // handle filter value and merge to the data
  handleSearchItem = data => {
    console.log("handleSearchItem", data);
    this.setState({ filteredListItem: data });
  };

  handleToggle = (value, index) => {
    const { checked, filteredListItem } = this.state;

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      filteredListItem[index].isSelected = true;
    } else {
      newChecked.splice(currentIndex, 1);
      filteredListItem[index].isSelected = false;
    }

    this.setState({ checked: newChecked, filteredListItem });
  };

  handleChangeView = value => {
    this.setState({ isListView: value });
  };

  render() {
    const { checked, isListView, filteredListItem, isOpen } = this.state;
    console.log("filteredListItem render", filteredListItem);
    const thumbnailStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.8)"
    };
    // Render filter color and list color
    return (
      <div className="card">
        <div className="card-body">
          <div className="row d-flex justify-content-between align-items-center">
            <FilterGallery
              {...this.state}
              handleSearchItem={this.handleSearchItem}
            />
          </div>
        </div>
        <div className="card-body mb-0 p-0">
          <div
            style={{
              display: "block",
              minHeight: "1px",
              width: "100%",
              border: "1px solid #ddd",
              overflow: "auto"
              //   maxHeight: isListView ? "300px" : ""
            }}
          >
            <Gallery
              id="galleryItem"
              images={filteredListItem}
              rowHeight="84px"
              enableImageSelection={false}
              enableLightbox={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  images: [
    {
      thumbnail: "http://localhost:7999/public/assets/img/red.jpg",
      color: "red"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/green.jpg",
      color: "green"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/blue.jpg",
      color: "blue"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/green.jpg",
      color: "green"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/blue.jpg",
      color: "blue"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/blue.jpg",
      color: "blue"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/red.jpg",
      color: "red"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/black.jpg",
      color: "black"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/purple.jpg",
      color: "purple"
    },
    {
      thumbnail: "http://localhost:7999/public/assets/img/brown.jpg",
      color: "brown"
    }
  ]
};
render(<App />, document.getElementById("app"));
