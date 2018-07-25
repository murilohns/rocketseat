import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import './main.css';

import Header from './Header';
import Post from './Post';

moment.locale('pt-br');

class App extends Component {
  state = {
    posts: [
      {
        id: '1',
        username: 'murilo teste',
        userimage:
          'http://fc05.deviantart.net/fs70/i/2012/239/3/1/aang_in_avatar_state_by_leo_chelny-d5cmoc3.png',
        date: '12-12-2017',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor non lectus nec ultrices. Donec malesuada lacus sed est dignissim vestibulum. Quisque tincidunt nisi quis nunc fringilla sodales nec sit amet tellus. Suspendisse lorem ex, vehicula id libero vel, feugiat placerat urna. Nullam cursus quam lectus, vitae laoreet orci laoreet quis. Nullam lacinia tempor justo, eu rutrum risus egestas non. Nullam commodo, mi vel dictum aliquam, ex erat fermentum urna, ac pellentesque erat metus eget arcu.',
      },
      {
        id: '2',
        username: 'vagn teste',
        userimage: 'https://pbs.twimg.com/profile_images/662123183508692992/ajVoB3G8_400x400.png',
        date: '07-07-2017',
        body:
          'Quisque pellentesque leo ex, at semper dui pellentesque ut. Suspendisse potenti. Aliquam vitae blandit purus. Pellentesque sollicitudin tristique tortor vel condimentum. Quisque quis velit ac massa consequat maximus a at velit. Suspendisse facilisis mi consequat lectus facilisis posuere. Vestibulum fringilla blandit maximus. Suspendisse tristique finibus lacus a accumsan. Cras porttitor eleifend odio et hendrerit.',
      },
      {
        id: '3',
        username: 'jonatas teste',
        userimage: 'http://pm1.narvii.com/6335/65feffd7fee62f4e8de982378430334c6d8ed562_00.jpg',
        date: '04-04-2017',
        body:
          'Suspendisse ante nunc, maximus et lacinia consequat, finibus in dui. Morbi euismod vel odio sit amet ullamcorper. In fermentum mauris tellus, vel sagittis lorem pretium eget. Morbi quis sapien magna. Cras dignissim ac arcu eget tempus. Pellentesque ut nisl aliquet, ornare lacus sit amet, laoreet dui. Integer iaculis porttitor orci ultricies finibus. Mauris tincidunt porttitor nunc. Duis finibus non nisl ut tincidunt. Ut vestibulum nulla dui, a vehicula massa interdum ut. Ut accumsan non ligula vitae luctus.',
      },
    ],
  };

  render() {
    const { posts } = this.state;
    return (
      <Fragment>
        <Header />
        {posts.map(post => <Post key={post.id} data={post} />)}
      </Fragment>
    );
  }
}

render(<App />, document.querySelector('[name="app"]'));
