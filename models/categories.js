/**
 * Created by amirassad on 9/22/17.
 */

const mongoose = require('mongoose');

const paintingCategorySchema = mongoose.Schema({
    category : String
});

const PaintingCategory = mongoose.model('PaintingCategory', paintingCategorySchema);

module.exports = PaintingCategory;

