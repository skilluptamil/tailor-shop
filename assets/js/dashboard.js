/**
 * SARTORIA ROYALE - Admin Dashboard Logic (dashboard.js)
 * Chart.js analytics, appointment status filters, and table management
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Sidebar Toggle
  -------------------------------------------------------------------------- */
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const adminSidebar = document.querySelector('.admin-sidebar');

  if (sidebarToggleBtn && adminSidebar) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      adminSidebar.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992 && adminSidebar.classList.contains('show')) {
        if (!adminSidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
          adminSidebar.classList.remove('show');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Revenue & Appointment Charts (Chart.js)
  -------------------------------------------------------------------------- */
  // Revenue Line Chart
  const revenueChartCanvas = document.getElementById('revenueChart');
  if (revenueChartCanvas && typeof Chart !== 'undefined') {
    const ctx = revenueChartCanvas.getContext('2d');
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(197, 168, 128, 0.4)');
    gradient.addColorStop(1, 'rgba(197, 168, 128, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue ($)',
          data: [12400, 14800, 19200, 18500, 24600, 28900, 31200, 34500, 38000, 42100, 46500, 52800],
          borderColor: '#C5A880',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#171513',
          pointBorderColor: '#C5A880',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: 'rgba(200, 200, 200, 0.1)' },
            ticks: {
              callback: function (val) {
                return '$' + (val / 1000) + 'k';
              }
            }
          }
        }
      }
    });
  }

  // Order Status Doughnut Chart
  const orderStatusCanvas = document.getElementById('orderStatusChart');
  if (orderStatusCanvas && typeof Chart !== 'undefined') {
    const ctx = orderStatusCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
        datasets: [{
          data: [64, 22, 10, 4],
          backgroundColor: ['#28a745', '#C5A880', '#fd7e14', '#dc3545'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 12 } }
          }
        },
        cutout: '70%'
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Recent Appointments Table Filter
  -------------------------------------------------------------------------- */
  const statusFilterSelect = document.getElementById('appointmentStatusFilter');
  const appointmentRows = document.querySelectorAll('.appointment-table-row');

  if (statusFilterSelect && appointmentRows.length > 0) {
    statusFilterSelect.addEventListener('change', function () {
      const selected = this.value.toLowerCase();
      appointmentRows.forEach(row => {
        const status = row.getAttribute('data-status').toLowerCase();
        if (selected === 'all' || status === selected) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Customer Search in Table
  -------------------------------------------------------------------------- */
  const customerSearch = document.getElementById('customerSearchInput');
  const customerRows = document.querySelectorAll('.customer-table-row');

  if (customerSearch && customerRows.length > 0) {
    customerSearch.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      customerRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
});
