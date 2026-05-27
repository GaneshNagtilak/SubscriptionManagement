import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider, useSubscriptions } from './context/SubscriptionContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddSubscription from './components/AddSubscription';
import SubscriptionList from './components/SubscriptionList';
import UpcomingPayments from './components/UpcomingPayments';

const Notification = () => {
  const { notification } = useSubscriptions();

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      {notification.type === 'success' ? '✅' : 'ℹ️'} {notification.message}
    </div>
  );
};

const AppContent = () => {
  return (
    <div className="app">
      <Navbar />
      <Notification />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddSubscription />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/upcoming" element={<UpcomingPayments />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <SubscriptionProvider>
        <AppContent />
      </SubscriptionProvider>
    </Router>
  );
};

export default App;