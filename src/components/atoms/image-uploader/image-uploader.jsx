/*eslint no-restricted-globals: ["off"]*/
import { MinusButton } from "atoms";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DragSortableList from "react-drag-sortable";
import Dropzone from "react-dropzone";
import { isEmpty } from "lodash";
import styles from "./image-uploader.module.scss";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      list: []
    };
  }
  componentDidMount() {
    const { defaultValue } = this.props;
    if (!isEmpty(defaultValue)) {
      const list = this.convertToDragSortableListData(defaultValue);
      this.setState({ list });
    }
  }
  removeFileFromList(targetArray, filename, dataType = "default") {
    const { onChange } = this.props;
    if (dataType === "file") {
      const files = targetArray.filter(file => file.name !== filename);
      const list = this.convertToDragSortableListData(files, "file");
      this.setState({ files, list }, () => {
        onChange({ files });
      });
    } else if (dataType === "default") {
      let list = targetArray.filter(item => item.key !== filename);
      list = this.convertToDragSortableListData(list);
      const keyOrder = list.map(item => item.content.key);
      this.setState({ list }, () => {
        onChange({ keyOrder });
      });
    }
  }
  convertToDragSortableListData(targetArray, dataType = "default") {
    const data = targetArray.map(item => {
      let datum;
      let filename;
      let src;
      if (dataType === "file") {
        filename = item.name;
        src = item.preview;
      } else if (dataType === "default") {
        filename = item.key;
        src = item.publicURL;
      }
      datum = {
        content: (
          <div key={filename} className={styles.file}>
            <img src={src} alt="" />
            {targetArray.length > 1 && (
              <div className={styles.minusButton}>
                <MinusButton
                  onClick={e => {
                    e.preventDefault();
                    const confirmed = confirm(
                      "Are you sure you want to delete this image?"
                    );
                    if (confirmed) {
                      this.removeFileFromList(targetArray, filename, dataType);
                    }
                  }}
                />
              </div>
            )}
          </div>
        )
      };
      return datum;
    });
    return data;
  }
  onSort(sortedList) {
    const { defaultValue, onChange } = this.props;
    const { files } = this.state;
    const keyOrder = sortedList.map(item => item.content.key);
    if (!isEmpty(files)) {
      const sortFiles = (sortOrder, originalFiles) => {
        const newOrder = [];
        for (let i = 0; i < sortOrder.length; i++) {
          const reorderedItem = originalFiles.find(
            item => sortOrder[i] === item.name
          );
          newOrder.push(reorderedItem);
        }
        return newOrder;
      };
      const sortedFiles = sortFiles(keyOrder, files);
      const list = this.convertToDragSortableListData(sortedFiles, "file");
      this.setState({ files, list }, () => {
        onChange({ files: sortedFiles });
      });
    } else {
      const sortDefaultValue = (sortOrder, originalValue) => {
        const newOrder = [];
        for (let i = 0; i < sortOrder.length; i++) {
          const reorderedItem = originalValue.find(
            content => sortOrder[i] === content.key
          );
          newOrder.push(reorderedItem);
        }
        return newOrder;
      };
      const sortedValue = sortDefaultValue(keyOrder, defaultValue);
      const list = this.convertToDragSortableListData(sortedValue);
      this.setState({ list }, () => {
        onChange({ keyOrder });
      });
    }
  }
  onDrop(acceptedFiles) {
    const { onChange } = this.props;
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    const list = this.convertToDragSortableListData(files, "file");
    this.setState({ files, list }, () => {
      onChange({ files });
    });
  }
  render() {
    const { list } = this.state;
    const { label } = this.props;
    return (
      <div data-testid="image-uploader">
        <div className={styles.label}>{label}</div>
        <Dropzone
          accept="image/jpeg"
          onDrop={acceptedFiles => this.onDrop(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.dropzone}>
                  <p>Press here to add some .jpg images.</p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        {!isEmpty(list) && (
          <div data-testid="sortable-list" className={styles.sortableList}>
            <DragSortableList
              items={list}
              moveTransitionDuration={0.3}
              type="vertical"
              onSort={e => {
                this.onSort(e);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
ImageUploader.propTypes = {
  label: PropTypes.string,
  onDrop: PropTypes.func,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func
};
ImageUploader.defaultProps = {
  label: "add label",
  onDrop: () => {},
  defaultValue: [],
  onChange: () => {}
};
export default ImageUploader;
