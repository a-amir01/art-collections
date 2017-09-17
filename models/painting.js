/**
 * Created by amirassad on 7/19/17.
 */

"use strict";

const mongoose = require('mongoose');

const paintingSchema = mongoose.Schema({
    title: String,
    image: Object,
    size: String,
    style: String,
    category: String,
    description: String,
    // tags: [ String ],
    // price: Number,
    // created: Number,
    // similars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Painting" }],

    // similars: {
    //     paintings: [{
    //         _id: { inputType: String, ref: 'Painting' }
    //     }]
    // }
    //similars: [ this ],
});

const Painting = mongoose.model('Painting', paintingSchema);

module.exports = Painting;
