import React, { useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import {
  getMonthlyCost,
  formatCurrency,
  formatDate,
  getNextPaymentDate,
  getCategoryStyle,
} from '../utils/helpers';
import {
  FiTrash2,
  FiPause,
  FiPlay,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';

const SubscriptionList = () => {
  const { subscriptions, deleteSubscription, toggleSubscription } =
    useSubscriptions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [...new Set(subscriptions.map((s) => s.category))];

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || sub.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && sub.active) ||
      (filterStatus === 'paused' && !sub.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSubscription(id);
    }
  };

  return (
    <div className="subscription-list">
      <div className="page-header">
        <h2>All Subscriptions</h2>
        <p className="page-subtitle">
          Manage all your subscription services in one place
        </p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Subscription Cards */}
      {filteredSubscriptions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No subscriptions found</h3>
          <p>
            {subscriptions.length === 0
              ? 'Start by adding your first subscription!'
              : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <div className="sub-cards-grid">
          {filteredSubscriptions.map((sub) => {
            const catStyle = getCategoryStyle(sub.category);
            const monthlyCost = getMonthlyCost(sub.cost, sub.frequency);
            const nextPayment = getNextPaymentDate(
              sub.startDate,
              sub.frequency
            );

            return (
              <div
                key={sub.id}
                className={`sub-card ${!sub.active ? 'sub-card-paused' : ''}`}
              >
                <div className="sub-card-header">
                  <div className="sub-card-left">
                    <span
                      className="sub-category-badge"
                      style={{
                        backgroundColor: catStyle.bg,
                        color: catStyle.color,
                      }}
                    >
                      {catStyle.icon} {sub.category}
                    </span>
                    {!sub.active && (
                      <span className="paused-badge">Paused</span>
                    )}
                  </div>
                  <div className="sub-card-actions">
                    <button
                      className={`action-btn ${
                        sub.active ? 'btn-pause' : 'btn-resume'
                      }`}
                      onClick={() => toggleSubscription(sub.id)}
                      title={sub.active ? 'Pause' : 'Resume'}
                    >
                      {sub.active ? <FiPause /> : <FiPlay />}
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => handleDelete(sub.id, sub.name)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="sub-card-body">
                  <h3 className="sub-name">{sub.name}</h3>
                  <div className="sub-pricing">
                    <span className="sub-cost">
                      {formatCurrency(sub.cost)}
                    </span>
                    <span className="sub-frequency">/ {sub.frequency}</span>
                  </div>
                  <span className="sub-monthly">
                    ≈ {formatCurrency(monthlyCost)}/month
                  </span>
                </div>

                <div className="sub-card-footer">
                  <div className="sub-detail">
                    <span className="detail-label">Started</span>
                    <span className="detail-value">
                      {formatDate(sub.startDate)}
                    </span>
                  </div>
                  <div className="sub-detail">
                    <span className="detail-label">Next Payment</span>
                    <span className="detail-value">
                      {formatDate(nextPayment)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;