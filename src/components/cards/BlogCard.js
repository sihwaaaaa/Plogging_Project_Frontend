import UilFile from '@iconscout/react-unicons/icons/uil-file-alt';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart-sign';
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogCardStyleWrap } from './Style';

function BlogCard({ item, theme }) {
  const { content, title, img } = item;
  return (
    <BlogCardStyleWrap>
      <figure className={`ninjadash-blog ninjadash-blog-${theme}`}>
        <div className="ninjadash-blog-thumb">
          <img className="ninjadash-blog__image" src={require(`../../static/img/pages/rewardImg/${img}`)} alt="ninjadash Blog" />
        </div>
        <figcaption>
          {theme === 'style-1' ? (
            <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-1">
              <span className="ninjadash-blog-meta__single ninjadash-date-meta">01 July 2020</span>
            </div>
          ) : (
            ''
          )}
          <h2 className="ninjadash-blog__title">
            <span>{title}</span>
          </h2>
          <p className="ninjadash-blog__text">{content}</p>
          <div className="ninjadash-blog__bottom">
          </div>
        </figcaption>
      </figure>
    </BlogCardStyleWrap>
  );
}

BlogCard.propTypes = {
  item: propTypes.object,
  theme: propTypes.string,
};

export default BlogCard;
