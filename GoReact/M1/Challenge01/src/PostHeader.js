import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const PostHeader = ({ data }) => (
  <div className="post-header">
    <div className="user-image">
      <img src={data.userimage} className="post-image" alt="Avatar" />
    </div>
    <div className="user-name">
      <p className="username">{data.username}</p>
      <p className="hours-ago">{moment(new Date(data.date)).fromNow()}</p>
    </div>
  </div>
);

PostHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostHeader;
