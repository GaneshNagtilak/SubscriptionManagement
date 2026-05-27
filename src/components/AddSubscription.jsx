import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import { categoryColors } from '../utils/helpers';
import { FiSave, FiX } from 'react-icons/fi';

const categories = Object.keys(categoryColors);

const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly (Every 3 months)' },
  { value: 'yearly', label: 'Yearly' },
];

const AddSubscription = () => {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    cost: '',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Please enter a valid cost';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addSubscription({
      ...formData,
      cost: parseFloat(formData.cost),
    });

    navigate('/subscriptions');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      cost: '',
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  return (
    <div className="add-subscription">
      <div className="page-header">
        <h2>Add New Subscription</h2>
        <p className="page-subtitle">
          Track a new subscription service by filling in the details below
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="subscription-form">
          {/* Service Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Service Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Netflix, Spotify, AWS..."
              className={`form-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-input form-select ${
                errors.category ? 'input-error' : ''
              }`}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryColors[cat].icon} {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>

          {/* Cost & Frequency Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cost" className="form-label">
                Cost (₹) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="e.g., 499"
                min="0"
                step="0.01"
                className={`form-input ${errors.cost ? 'input-error' : ''}`}
              />
              {errors.cost && (
                <span className="error-message">{errors.cost}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="frequency" className="form-label">
                Billing Frequency <span className="required">*</span>
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="form-input form-select"
              >
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="form-group">
            <label htmlFor="startDate" className="form-label">
              Start / Billing Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`form-input ${errors.startDate ? 'input-error' : ''}`}
            />
            {errors.startDate && (
              <span className="error-message">{errors.startDate}</span>
            )}
          </div>

          {/* Preview Card */}
          {formData.name && formData.cost && (
            <div className="preview-card">
              <h4>Preview</h4>
              <div className="preview-details">
                <span className="preview-name">
                  {formData.category &&
                    categoryColors[formData.category]?.icon + ' '}
                  {formData.name}
                </span>
                <span className="preview-cost">
                  ₹{parseFloat(formData.cost || 0).toFixed(2)} /{' '}
                  {formData.frequency}
                </span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <FiSave /> Add Subscription
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <FiX /> Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;