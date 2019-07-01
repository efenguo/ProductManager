'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * A Validation function for product name
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal names
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

// Only a validation function for product name
var validateNumber = function (number) {
  return number.isNumeric;
};
/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Product name'
  },
  skuNumber: {
    type: String,
    required: 'Please fill Product SKU number'
  },
  description: {
    type: String,
    required: 'Please fill Product description'
  },
  price: {
    type: Number,
    default: 0,
    required: 'Please fill Product price',
    validate: [validateNumber, 'Please input a valid number']

  },
  availableStockQuantity: {
    type: Number,
    default: 0,
    required: 'Please fill Product quantity',
    validate: [validateNumber, 'Please input a valid number']
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Product', ProductSchema);
