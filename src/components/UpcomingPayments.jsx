import React from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import {
  getUpcomingPayments,
  formatCurrency,
  formatDate,
  daysUntil,
  getCategoryStyle,
} from '../utils/helpers';

const UpcomingPayments = () => {
  const { subscriptions } = useSubscriptions();
  const upcomingPayments = getUpcomingPayments(subscriptions);

  const totalUpcoming = upcomingPayments.reduce(
    (sum, sub) => sum + sub.cost,
    0
  );

  return (
    <div className="upcoming-payments">
      <div className="page-header">
        <h2>Upcoming Payments</h2>
        <p className="page-subtitle">
          Payments due in the next 30 days • Total:{' '}
          <strong>{formatCurrency(totalUpcoming)}</strong>
        </p>
      </div>

      {upcomingPayments.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎉</span>
          <h3>No upcoming payments</h3>
          <p>You have no payments due in the next 30 days. Enjoy!</p>
        </div>
      ) : (
        <div className="upcoming-timeline">
          {upcomingPayments.map((sub) => {
            const days = daysUntil(sub.nextPayment);
            const catStyle = getCategoryStyle(sub.category);
            const urgencyClass =
              days <= 3
                ? 'urgency-high'
                : days <= 7
                ? 'urgency-medium'
                : 'urgency-low';

            return (
              <div
                key={sub.id}
                className={`timeline-item ${urgencyClass}`}
              >
                <div className="timeline-marker">
                  <div
                    className="timeline-dot"
                    style={{ backgroundColor: catStyle.color }}
                  ></div>
                  <div className="timeline-line"></div>
                </div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <div className="timeline-left">
                      <span
                        className="timeline-icon"
                        style={{ backgroundColor: catStyle.bg }}
                      >
                        {catStyle.icon}
                      </span>
                      <div>
                        <h4 className="timeline-name">{sub.name}</h4>
                        <span className="timeline-category">
                          {sub.category} • {sub.frequency}
                        </span>
                      </div>
                    </div>
                    <div className="timeline-right">
                      <span className="timeline-cost">
                        {formatCurrency(sub.cost)}
                      </span>
                      <span className={`timeline-days ${urgencyClass}`}>
                        {days === 0
                          ? '🔴 Today!'
                          : days === 1
                          ? '🟡 Tomorrow'
                          : `📅 in ${days} days`}
                      </span>
                    </div>
                  </div>
                  <div className="timeline-date">
                    Due: {formatDate(sub.nextPayment)}
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

export default UpcomingPayments;