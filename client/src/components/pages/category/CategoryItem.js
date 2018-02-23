/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryItem({ label }) {
    return (
        <div>
            { label }
        </div>
    );
}

CategoryItem.propTypes = {
    label: PropTypes.string.isRequired,
};

