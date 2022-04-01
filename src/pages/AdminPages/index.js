import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function AdminPages() {
  const [showSidebar, setShowSidebar] = useState('-left-64');
  return (
    <>
      <Dashboard />
    </>
  );
}
