import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { AddToFavoriteButton } from 'components/Button/Button';
import { addFavoriteById, deleteFavoriteById } from 'apiService';
import { selectUser } from 'Redux/auth/selectors';

import {
  HeroSection,
  HeroSectionTitle,
  HeroSectionText,
  HeroSectionRecipeTimeBox,
  HeroSectionRecipeTime,
  ClockIcon,
} from './RecipePageHero.styled';
import { toast } from 'react-hot-toast';

export const RecipeHero = ({ descr, title, time, id, favorites }) => {
  const [isOwner, setIsOwner] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (favorites?.includes(user.id)) {
      setIsOwner(true);
    }
  }, [favorites, user.id]);

  const handleAddToFavorite = async () => {
    const resp = await addFavoriteById(id);
    if (resp) {
      setIsOwner(true);
      toast.success('Added to favorite sucsess!');
    }
  };

  const handleRemoveFromFavorites = async () => {
    const resp = await deleteFavoriteById(id);

    if (resp) {
      setIsOwner(false);
      toast.error('Deleted from favorites');
    }
  };

  return (
    <HeroSection>
      <HeroSectionTitle>{title}</HeroSectionTitle>
      <HeroSectionText>{descr}</HeroSectionText>
      {!isOwner ? (
        <AddToFavoriteButton
          onClick={handleAddToFavorite}
          children={'Add to favorite recipes'}
        />
      ) : (
        <AddToFavoriteButton
          onClick={handleRemoveFromFavorites}
          children={'Delete from favorite recipes'}
        />
      )}
      <HeroSectionRecipeTimeBox>
        <ClockIcon />
        <HeroSectionRecipeTime>{time} min</HeroSectionRecipeTime>
      </HeroSectionRecipeTimeBox>
    </HeroSection>
  );
};
