import React from 'react';
import PropTypes from 'prop-types';

const PostContent = ({ data }) => <p className="post-content">{data.body} </p>;

PostContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostContent;
