// Calculate the next payment date based on frequency
export const getNextPaymentDate = (startDate, frequency) => {
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let next = new Date(start);

  while (next <= today) {
    switch (frequency) {
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'quarterly':
        next.setMonth(next.getMonth() + 3);
        break;
      case 'yearly':
        next.setFullYear(next.getFullYear() + 1);
        break;
      default:
        next.setMonth(next.getMonth() + 1);
    }
  }

  return next;
};

// Calculate monthly cost based on frequency
export const getMonthlyCost = (cost, frequency) => {
  switch (frequency) {
    case 'weekly':
      return cost * 4.33;
    case 'monthly':
      return cost;
    case 'quarterly':
      return cost / 3;
    case 'yearly':
      return cost / 12;
    default:
      return cost;
  }
};

// Get payments due in the current month
export const getCurrentMonthPayments = (subscriptions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return subscriptions.filter((sub) => {
    if (!sub.active) return false;
    const nextPayment = getNextPaymentDate(sub.startDate, sub.frequency);
    return (
      nextPayment.getMonth() === currentMonth &&
      nextPayment.getFullYear() === currentYear
    );
  });
};

// Get upcoming payments (next 30 days)
export const getUpcomingPayments = (subscriptions) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

  return subscriptions
    .filter((sub) => sub.active)
    .map((sub) => ({
      ...sub,
      nextPayment: getNextPaymentDate(sub.startDate, sub.frequency),
    }))
    .filter(
      (sub) => sub.nextPayment >= today && sub.nextPayment <= thirtyDaysLater
    )
    .sort((a, b) => a.nextPayment - b.nextPayment);
};

// Get current month total expense
export const getCurrentMonthExpense = (subscriptions) => {
  return subscriptions
    .filter((sub) => sub.active)
    .reduce((total, sub) => total + getMonthlyCost(sub.cost, sub.frequency), 0);
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Days until next payment
export const daysUntil = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff;
};

// Category colors mapping
export const categoryColors = {
  Entertainment: { bg: '#fef3c7', color: '#d97706', icon: '🎬' },
  Music: { bg: '#ede9fe', color: '#7c3aed', icon: '🎵' },
  Productivity: { bg: '#dbeafe', color: '#2563eb', icon: '⚡' },
  'Cloud Storage': { bg: '#d1fae5', color: '#059669', icon: '☁️' },
  Education: { bg: '#fce7f3', color: '#db2777', icon: '📚' },
  Fitness: { bg: '#ffedd5', color: '#ea580c', icon: '💪' },
  News: { bg: '#f1f5f9', color: '#475569', icon: '📰' },
  Gaming: { bg: '#fee2e2', color: '#dc2626', icon: '🎮' },
  Software: { bg: '#e0e7ff', color: '#4f46e5', icon: '💻' },
  Other: { bg: '#f3f4f6', color: '#6b7280', icon: '📦' },
};

export const getCategoryStyle = (category) => {
  return categoryColors[category] || categoryColors['Other'];
};