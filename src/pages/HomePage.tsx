import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OryzoMansionExperience } from '../components/public/OryzoMansionExperience';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <OryzoMansionExperience
      onNavigateToDesignSpace={() => navigate('/design-my-space')}
      onNavigateToShop={() => navigate('/shop')}
      onNavigateToMyHome={() => navigate('/my-home')}
    />
  );
};
