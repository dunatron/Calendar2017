import i18n from 'i18n';
import React from 'react';
import SilverStripeComponent from 'lib/SilverStripeComponent';
import CONSTANTS from 'constants';
import fileShape from 'lib/fileShape';
import { fileSize } from 'lib/DataFormat';

class UploadFieldItem extends SilverStripeComponent {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  /**
   * Gets props for thumbnail
   *
   * @returns {Object}
   */
  getThumbnailStyles() {
    if (this.isImage() && (this.exists() || this.uploading())) {
      const thumbnail = this.props.item.smallThumbnail || this.props.item.url;
      return {
        backgroundImage: `url(${thumbnail})`,
      };
    }

    return {};
  }

  /**
   * Checks if the component has an error set.
   *
   * @return {boolean}
   */
  hasError() {
    if (this.props.item.message) {
      return this.props.item.message.type === 'error';
    }

    return false;
  }

  /**
   * Returns markup for an error message if one is set.
   *
   * @returns {Object}
   */
  renderErrorMessage() {
    let message = null;

    if (this.hasError()) {
      message = this.props.item.message.value;
    } else if (!this.exists() && !this.uploading()) {
      message = i18n._t('AssetAdmin.FILE_MISSING', 'File cannot be found');
    }

    if (message !== null) {
      return (
        <div className="uploadfield-item__error-message">
          {message}
        </div>
      );
    }

    return null;
  }

  /**
   * Retrieve list of thumbnail classes
   *
   * @returns {string}
   */
  getThumbnailClassNames() {
    const thumbnailClassNames = ['uploadfield-item__thumbnail'];

    if (this.isImageSmallerThanThumbnail()) {
      thumbnailClassNames.push('uploadfield-item__thumbnail--small');
    }

    return thumbnailClassNames.join(' ');
  }

  /**
   * Retrieves class names for the item
   *
   * @returns {string}
   */
  getItemClassNames() {
    const category = this.props.item.category || 'none';
    const itemClassNames = [
      'fill-width',
      'uploadfield-item',
      `uploadfield-item--${category}`,
    ];

    if (!this.exists() && !this.uploading()) {
      itemClassNames.push('uploadfield-item--missing');
    }

    if (this.hasError()) {
      itemClassNames.push('uploadfield-item--error');
    }

    return itemClassNames.join(' ');
  }

  /**
   * Determine if this is an image type
   *
   * @returns {Boolean}
   */
  isImage() {
    return this.props.item.category === 'image';
  }

  /**
   * Validate that the file backing this record is not missing
   *
   * @returns {Boolean}
   */
  exists() {
    return this.props.item.exists;
  }

  /**
   * Check if this item is in the process uploaded.
   * If false this file was attached to this editor instead.
   *
   * @returns {Boolean}
   */
  uploading() {
    return !!this.props.item.uploaded;
  }

  /**
   * Check if this item has been successfully uploaded.
   * Excludes items not uploaded in this request.
   *
   * @returns {Boolean}
   */
  complete() {
    // Uploading is complete if saved with a DB id
    return this.uploading() && this.props.item.id > 0;
  }

  /**
   * Determine that this record is an image, and the thumbnail is smaller than the given thumbnail area
   *
   * @returns {boolean}
   */
  isImageSmallerThanThumbnail() {
    if (!this.isImage() || (!this.exists() && !this.uploading())) {
      return false;
    }
    const width = this.props.item.width;
    const height = this.props.item.height;

    // Note: dimensions will be null if the back-end image is lost
    return (
      height
      && width
      && height < CONSTANTS.SMALL_THUMBNAIL_HEIGHT
      && width < CONSTANTS.SMALL_THUMBNAIL_WIDTH
    );
  }

  /**
   * Avoids the browser's default focus state when selecting an item.
   *
   * @param {Object} event Event object.
   */
  preventFocus(event) {
    event.preventDefault();
  }

  /**
   * Handles remove (x) button click
   *
   * @param {Object} event
   */
  handleRemove(event) {
    event.preventDefault();
    if (this.props.handleRemove) {
      this.props.handleRemove(event, this.props.item);
    }
  }

  /**
   * Gets upload progress bar
   *
   * @returns {Object}
   */
  renderProgressBar() {
    const progressBarProps = {
      className: 'uploadfield-item__progress-bar',
      style: {
        width: `${this.props.item.progress}%`,
      },
    };

    if (!this.hasError() && this.uploading()) {
      if (this.complete()) {
        return (
          <div className="uploadfield-item__complete-icon"></div>
        );
      }
      return (
        <div className="uploadfield-item__upload-progress">
          <div {...progressBarProps}></div>
        </div>
      );
    }

    return null;
  }

  /**
   * Gets the remove item button
   *
   * @returns {XML}
   */
  renderRemoveButton() {
    if (!this.props.canEdit) {
      return null;
    }
    const classes = [
      'btn',
      'uploadfield-item__remove-btn',
      'btn-secondary',
      'btn--no-text',
      'font-icon-cancel',
      'btn--icon-md',
    ].join(' ');
    return (
      <button
        className={classes}
        onClick={this.handleRemove}
        ref="backButton"
      >
      </button>
    );
  }

  /**
   * Get file title / metadata block
   *
   * @returns {XML}
   */
  renderFileDetails() {
    let size = '';
    if (this.props.item.size) {
      size = `, ${fileSize(this.props.item.size)}`;
    }
    return (
      <div className="uploadfield-item__details fill-width flexbox-area-grow">
        <span className="uploadfield-item__title" ref="title">
          {this.props.item.title}
        </span>
        <span className="uploadfield-item__meta">
          {this.props.item.extension}{size}
        </span>
      </div>
    );
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const fieldName = `${this.props.name}[Files][]`;
    return (
      <div className={this.getItemClassNames()}>
        <input type="hidden" value={this.props.item.id} name={fieldName} />
        <div
          ref="thumbnail"
          className={this.getThumbnailClassNames()}
          style={this.getThumbnailStyles()}
        ></div>
        {this.renderFileDetails()}
        {this.renderProgressBar()}
        {this.renderErrorMessage()}
        {this.renderRemoveButton()}
      </div>
    );
  }
}

UploadFieldItem.propTypes = {
  canEdit: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  item: fileShape,
  handleRemove: React.PropTypes.func,
};

export default UploadFieldItem;
