import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sections } from 'components/MainPageCategorySection/Sections';
import {
  SeeAllButton,
  OtherCategoriesButton,
} from 'components/Button/Button.jsx';
import { RecipeItem } from 'components/RecipeItem/RecipeItem';
import { RecipesContainer } from './PreviewCategories.styled';

export function PreviewCategories() {
  const [items, setItems] = useState('');
  const [viewportWidth, setViewportWidth] = useState(() => {
    const width = window.innerWidth;

    if (width >= 1440) {
      return 4;
    } else if (width >= 768 && width < 1240) {
      return 2;
    } else {
      return 1;
    }
  });
  const location = useLocation();
  const token = useSelector(state => state.auth.token);

  const instance = axios.create({
    baseURL: 'https://yummy-team4-nodejs-project.onrender.com/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    instance.get('/recipes/main-page').then(function (response) {
      setItems(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;

      if (width >= 1240) {
        setViewportWidth(4);
      } else if (width >= 768 && width < 1440) {
        setViewportWidth(2);
      } else {
        setViewportWidth(1);
      }
    };
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <>
      {items.length > 0
        ? items
            .map(item => (
              <RecipesContainer>
                <Sections title={item.category} children>
                  <RecipesContainer>
                    {item.recipes
                      .map(({ _id, preview, title }) => (
                        <RecipeItem id={_id} preview={preview} title={title} />
                      ))
                      .slice(0, viewportWidth)}
                  </RecipesContainer>
                  <Link
                    to={`/categories/${item.category}`}
                    state={{ from: location }}
                  >
                    <SeeAllButton children={'See all'} />
                  </Link>
                </Sections>
              </RecipesContainer>
            ))
            .slice(0, 4)
        : null}
      <Link to={`/categories/Beef`} state={{ from: location }}>
        {items && <OtherCategoriesButton children={'Other categories'} />}
      </Link>
    </>
  );
}