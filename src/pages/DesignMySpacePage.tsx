import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DesignMySpaceWorkflow } from '../components/design/DesignMySpaceWorkflow';

export const DesignMySpacePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DesignMySpaceWorkflow
      onSuccessNavigateToMyHome={() => navigate('/my-home')}
    />
  );
};
