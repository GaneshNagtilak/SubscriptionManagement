import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

// Sample data to start with
const sampleSubscriptions = [
  {
    id: 1,
    name: 'Netflix',
    category: 'Entertainment',
    cost: 649,
    frequency: 'monthly',
    startDate: '2024-01-15',
    active: true,
  },
  {
    id: 2,
    name: 'Spotify',
    category: 'Music',
    cost: 119,
    frequency: 'monthly',
    startDate: '2024-02-01',
    active: true,
  },
  {
    id: 3,
    name: 'Google One',
    category: 'Cloud Storage',
    cost: 1300,
    frequency: 'yearly',
    startDate: '2024-03-10',
    active: true,
  },
  {
    id: 4,
    name: 'Amazon Prime',
    category: 'Entertainment',
    cost: 1499,
    frequency: 'yearly',
    startDate: '2024-06-20',
    active: true,
  },
  {
    id: 5,
    name: 'Notion',
    category: 'Productivity',
    cost: 800,
    frequency: 'monthly',
    startDate: '2024-04-05',
    active: true,
  },
  {
    id: 6,
    name: 'Coursera Plus',
    category: 'Education',
    cost: 3500,
    frequency: 'quarterly',
    startDate: '2024-01-01',
    active: true,
  },
];

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : sampleSubscriptions;
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addSubscription = (subscription) => {
    const newSub = {
      ...subscription,
      id: Date.now(),
      active: true,
    };
    setSubscriptions((prev) => [...prev, newSub]);
    showNotification(`"${subscription.name}" added successfully!`);
  };

  const deleteSubscription = (id) => {
    const sub = subscriptions.find((s) => s.id === id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    showNotification(`"${sub?.name}" deleted.`, 'info');
  };

  const toggleSubscription = (id) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, active: !sub.active } : sub
      )
    );
    const sub = subscriptions.find((s) => s.id === id);
    const newStatus = !sub.active;
    showNotification(
      `"${sub?.name}" ${newStatus ? 'activated' : 'paused'}.`,
      newStatus ? 'success' : 'info'
    );
  };

  const editSubscription = (id, updated) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updated } : sub))
    );
    showNotification(`"${updated.name}" updated successfully!`);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        deleteSubscription,
        toggleSubscription,
        editSubscription,
        notification,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within SubscriptionProvider');
  }
  return context;
};