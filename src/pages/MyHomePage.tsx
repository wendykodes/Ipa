import React from 'react';
import { useLocation } from 'react-router-dom';
import { MyHomeCustomerPortal } from '../components/customer/MyHomeCustomerPortal';

export const MyHomePage: React.FC = () => {
  const location = useLocation();

  // Determine section from path: /my-home/approvals etc.
  const path = location.pathname;
  let initialTab: 'overview' | 'design_approvals' | 'change_orders' | 'finances' | 'saved_vault' | 'aftercare' = 'overview';

  if (path.includes('/approvals')) initialTab = 'design_approvals';
  else if (path.includes('/changes') || path.includes('/orders')) initialTab = 'change_orders';
  else if (path.includes('/payments') || path.includes('/finances')) initialTab = 'finances';
  else if (path.includes('/saved')) initialTab = 'saved_vault';
  else if (path.includes('/warranty') || path.includes('/aftercare')) initialTab = 'aftercare';

  return <MyHomeCustomerPortal initialSection={initialTab} />;
};
