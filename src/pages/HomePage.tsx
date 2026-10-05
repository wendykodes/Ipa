import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicEstateExperience } from '../components/public/PublicEstateExperience';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicEstateExperience
      onNavigateToDesignSpace={() => navigate('/design-my-space')}
      onNavigateToShop={() => navigate('/shop')}
      onNavigateToMyHome={() => navigate('/my-home')}
    />
  );
};
