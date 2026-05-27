import React from 'react';
import { Link } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import {
  getCurrentMonthExpense,
  getUpcomingPayments,
  getMonthlyCost,
  formatCurrency,
  formatDate,
  daysUntil,
  getCategoryStyle,
} from '../utils/helpers';
import {
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
  FiCalendar,
  FiArrowRight,
  FiPauseCircle,
} from 'react-icons/fi';

const Dashboard = () => {
  const { subscriptions } = useSubscriptions();

  const activeSubscriptions = subscriptions.filter((s) => s.active);
  const pausedSubscriptions = subscriptions.filter((s) => !s.active);
  const monthlyExpense = getCurrentMonthExpense(subscriptions);
  const yearlyExpense = monthlyExpense * 12;
  const upcomingPayments = getUpcomingPayments(subscriptions).slice(0, 5);

  // Category breakdown
  const categoryBreakdown = activeSubscriptions.reduce((acc, sub) => {
    const monthly = getMonthlyCost(sub.cost, sub.frequency);
    acc[sub.category] = (acc[sub.category] || 0) + monthly;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryBreakdown).sort(
    (a, b) => b[1] - a[1]
  );

  const maxCategoryValue =
    sortedCategories.length > 0 ? sortedCategories[0][1] : 0;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p className="page-subtitle">
          Overview of your subscriptions for{' '}
          {new Date().toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon-wrapper stat-icon-primary">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <span className="stat-label">Monthly Expense</span>
            <span className="stat-value">{formatCurrency(monthlyExpense)}</span>
            <span className="stat-change">
              {formatCurrency(yearlyExpense)}/year
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon-wrapper stat-icon-success">
            <FiActivity />
          </div>
          <div className="stat-content">
            <span className="stat-label">Active Services</span>
            <span className="stat-value">{activeSubscriptions.length}</span>
            <span className="stat-change">
              out of {subscriptions.length} total
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon-wrapper stat-icon-warning">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <span className="stat-label">Upcoming (30 days)</span>
            <span className="stat-value">{upcomingPayments.length}</span>
            <span className="stat-change">
              {formatCurrency(
                upcomingPayments.reduce((sum, s) => sum + s.cost, 0)
              )}{' '}
              due
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon-wrapper stat-icon-info">
            <FiPauseCircle />
          </div>
          <div className="stat-content">
            <span className="stat-label">Paused</span>
            <span className="stat-value">{pausedSubscriptions.length}</span>
            <span className="stat-change">services paused</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Upcoming Payments */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>
              <FiTrendingUp /> Upcoming Payments
            </h3>
            <Link to="/upcoming" className="card-link">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="card-body">
            {upcomingPayments.length === 0 ? (
              <div className="empty-state-small">
                <p>No upcoming payments in the next 30 days</p>
              </div>
            ) : (
              <div className="upcoming-list">
                {upcomingPayments.map((sub) => {
                  const days = daysUntil(sub.nextPayment);
                  const catStyle = getCategoryStyle(sub.category);
                  return (
                    <div key={sub.id} className="upcoming-item">
                      <div className="upcoming-left">
                        <span
                          className="category-icon"
                          style={{ backgroundColor: catStyle.bg }}
                        >
                          {catStyle.icon}
                        </span>
                        <div>
                          <span className="upcoming-name">{sub.name}</span>
                          <span className="upcoming-date">
                            {formatDate(sub.nextPayment)}
                          </span>
                        </div>
                      </div>
                      <div className="upcoming-right">
                        <span className="upcoming-cost">
                          {formatCurrency(sub.cost)}
                        </span>
                        <span
                          className={`upcoming-days ${
                            days <= 3
                              ? 'days-urgent'
                              : days <= 7
                              ? 'days-soon'
                              : 'days-normal'
                          }`}
                        >
                          {days === 0
                            ? 'Today'
                            : days === 1
                            ? 'Tomorrow'
                            : `in ${days} days`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📊 Spending by Category</h3>
          </div>
          <div className="card-body">
            {sortedCategories.length === 0 ? (
              <div className="empty-state-small">
                <p>No active subscriptions</p>
              </div>
            ) : (
              <div className="category-breakdown">
                {sortedCategories.map(([category, amount]) => {
                  const catStyle = getCategoryStyle(category);
                  const percentage = (amount / monthlyExpense) * 100;
                  return (
                    <div key={category} className="category-bar-item">
                      <div className="category-bar-header">
                        <span className="category-bar-label">
                          <span
                            className="category-dot"
                            style={{ backgroundColor: catStyle.color }}
                          ></span>
                          {catStyle.icon} {category}
                        </span>
                        <span className="category-bar-value">
                          {formatCurrency(amount)}/mo ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="category-bar-track">
                        <div
                          className="category-bar-fill"
                          style={{
                            width: `${(amount / maxCategoryValue) * 100}%`,
                            backgroundColor: catStyle.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;