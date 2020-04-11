import icons from '../assets/index';
import Home from '../pages/home/Home';
import Search from '../pages/search/Search';
import Upload from '../pages/upload/Upload';
import Like from '../pages/like/Like';
import Mine from '../pages/mine/Mine';
import React from 'react';
export default [
  {
    name: 'homeTab',
    id: '0',
    icon: icons.home,
    selectIcon: icons.homes,
    component: Home,
  },
  {
    name: 'searchTab',
    id: '1',
    icon: icons.search,
    selectIcon: icons.searchs,
    component: Search,
  },
  {
    name: 'uploadTab',
    id: '2',
    icon: icons.upload,
    component: Upload,
  },
  {
    name: 'likeTab',
    id: '3',
    icon: icons.like,
    selectIcon: icons.likes,
    component: Like,
  },
  {
    name: 'user',
    id: '4',
    icon: icons.user,
    selectIcon: icons.users,
    component: Mine,
    children: [],
  },
];
