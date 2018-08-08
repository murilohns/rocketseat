import React from 'react';
import PropTypes from 'prop-types';

import PostHeader from './PostHeader';
import PostContent from './PostContent';

const Post = ({ data }) => (
  <div id="post-container">
    <PostHeader data={data} />
    <PostContent data={data} />
  </div>
);

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;
