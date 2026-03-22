/* ============================================
   AutoInspect Pro — App Core
   ============================================ */

// --- Auth Check ---
function checkAuth() {
  const isLoggedIn = localStorage.getItem('autoinspect_logged_in');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (!isLoggedIn && currentPage !== 'index.html') {
    window.location.href = 'index.html';
    return;
  }

  // Role-based page access
  if (isLoggedIn) {
    const user = getCurrentUser();
    const adminPages = ['admin-users.html', 'admin-templates.html', 'admin-settings.html', 'audit-log.html'];
    const managerPages = ['analytics.html'];

    if (user.role === 'inspector' && (adminPages.includes(currentPage) || managerPages.includes(currentPage))) {
      window.location.href = 'dashboard.html';
    } else if (user.role === 'manager' && adminPages.includes(currentPage)) {
      window.location.href = 'dashboard.html';
    }
  }
}

function getCurrentUser() {
  const stored = localStorage.getItem('autoinspect_user');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { /* fall through */ }
  }
  return MOCK_DATA.currentUser;
}

function login(user) {
  // Mock login — store the selected demo user
  const loginUser = user || MOCK_DATA.currentUser;
  localStorage.setItem('autoinspect_logged_in', 'true');
  localStorage.setItem('autoinspect_user', JSON.stringify(loginUser));
  window.location.href = 'dashboard.html';
}

function logout() {
  localStorage.removeItem('autoinspect_logged_in');
  localStorage.removeItem('autoinspect_user');
  window.location.href = 'index.html';
}

// --- Sidebar Component ---
function renderSidebar(activeItem) {
  const currentUser = getCurrentUser();
  const role = currentUser.role;

  const sidebarHTML = `
    <div class="sidebar-brand">
      <div class="brand-logo">
        <i class="fas fa-car"></i>
      </div>
      <div class="brand-text">
        <span class="brand-name">AutoInspect Pro</span>
        <span class="brand-tagline">${currentUser.dealership}</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">Main</div>
        <a href="dashboard.html" class="nav-item ${activeItem === 'dashboard' ? 'active' : ''}">
          <i class="fas fa-th-large"></i>
          <span>Dashboard</span>
        </a>
        <a href="inspections.html" class="nav-item ${activeItem === 'inspections' ? 'active' : ''}">
          <i class="fas fa-clipboard-check"></i>
          <span>Inspections</span>
          <span class="nav-badge">3</span>
        </a>
        <a href="new-inspection.html" class="nav-item ${activeItem === 'new-inspection' ? 'active' : ''}">
          <i class="fas fa-plus-circle"></i>
          <span>New Inspection</span>
        </a>
        <a href="vehicles.html" class="nav-item ${activeItem === 'vehicles' ? 'active' : ''}">
          <i class="fas fa-car-side"></i>
          <span>Vehicles</span>
        </a>
      </div>

      ${role !== 'inspector' ? `
      <div class="nav-section">
        <div class="nav-section-title">Insights</div>
        <a href="analytics.html" class="nav-item ${activeItem === 'analytics' ? 'active' : ''}">
          <i class="fas fa-chart-bar"></i>
          <span>Analytics</span>
        </a>
      </div>` : ''}

      ${role === 'admin' ? `
      <div class="nav-section">
        <div class="nav-section-title">Administration</div>
        <a href="admin-users.html" class="nav-item ${activeItem === 'admin-users' ? 'active' : ''}">
          <i class="fas fa-users"></i>
          <span>Users</span>
        </a>
        <a href="admin-templates.html" class="nav-item ${activeItem === 'admin-templates' ? 'active' : ''}">
          <i class="fas fa-list-check"></i>
          <span>Templates</span>
        </a>
        <a href="admin-settings.html" class="nav-item ${activeItem === 'admin-settings' ? 'active' : ''}">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </div>` : ''}
    </nav>

    <div class="sidebar-footer">
      <button class="sidebar-toggle" onclick="toggleSidebarCollapse()" title="Toggle sidebar">
        <i class="fas fa-angles-left"></i>
        <span class="sidebar-toggle-label">Collapse</span>
      </button>
      <div class="sidebar-user" onclick="toggleUserMenu()">
        <div class="user-avatar">${currentUser.avatar}</div>
        <div class="user-info">
          <div class="user-name">${currentUser.name}</div>
          <div class="user-role">${capitalizeRole(currentUser.role)}</div>
        </div>
        <i class="fas fa-ellipsis-vertical" style="color: var(--color-gray-500); font-size: 0.875rem;"></i>
      </div>
    </div>
  `;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = sidebarHTML;
    restoreSidebarState();
  }
}

// --- Top Header Component ---
function renderHeader(title, breadcrumbs) {
  const breadcrumbHTML = breadcrumbs
    ? breadcrumbs.map((b, i) => {
        if (i < breadcrumbs.length - 1) {
          return `<a href="${b.href}">${b.label}</a><i class="fas fa-chevron-right separator"></i>`;
        }
        return `<span>${b.label}</span>`;
      }).join('')
    : '';

  const headerHTML = `
    <div class="header-left">
      <button class="mobile-menu-btn" onclick="toggleSidebar()" aria-label="Toggle menu">
        <i class="fas fa-bars"></i>
      </button>
      <div class="page-title-section">
        <h1>${title}</h1>
        ${breadcrumbHTML ? `<div class="breadcrumb">${breadcrumbHTML}</div>` : ''}
      </div>
    </div>
    <div class="header-right">
      <button class="header-action" data-tooltip="Search" aria-label="Search">
        <i class="fas fa-search"></i>
      </button>
      <button class="header-action" data-tooltip="Notifications" onclick="toggleNotifications()" aria-label="Notifications">
        <i class="fas fa-bell"></i>
        <span class="notification-dot"></span>
      </button>
      <button class="header-action" data-tooltip="Help" aria-label="Help">
        <i class="fas fa-question-circle"></i>
      </button>
      <div class="offline-indicator" id="offline-indicator" style="display:none">
        <i class="fas fa-wifi-slash"></i> Offline
      </div>
    </div>
  `;

  const header = document.getElementById('top-header');
  if (header) {
    header.innerHTML = headerHTML;
  }

  // Offline detection
  window.addEventListener('online', () => {
    const ind = document.getElementById('offline-indicator');
    if (ind) ind.style.display = 'none';
    showToast('success', 'Back Online', 'Connection restored');
  });
  window.addEventListener('offline', () => {
    const ind = document.getElementById('offline-indicator');
    if (ind) ind.style.display = 'flex';
    showToast('warning', 'Offline', 'You are currently offline. Changes will be saved locally.');
  });
  if (!navigator.onLine) {
    const ind = document.getElementById('offline-indicator');
    if (ind) ind.style.display = 'flex';
  }
}

// --- Mobile Sidebar Toggle ---
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// --- Sidebar Collapse Toggle (Desktop) ---
function toggleSidebarCollapse() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
  localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
  // Remove existing user menu so it re-creates with correct positioning
  const menu = document.getElementById('user-popover-menu');
  if (menu) menu.remove();
}

function restoreSidebarState() {
  if (localStorage.getItem('sidebar-collapsed') === 'true') {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('collapsed');
  }
}

// --- Toast Notifications ---
function showToast(type, title, message) {
  const container = document.getElementById('toast-container') || createToastContainer();

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type]} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// --- Modal ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// --- Dropdown ---
function toggleDropdown(btn) {
  const dropdown = btn.closest('.dropdown');
  const menu = dropdown.querySelector('.dropdown-menu');

  // Close all other dropdowns
  document.querySelectorAll('.dropdown-menu.show').forEach(d => {
    if (d !== menu) d.classList.remove('show');
  });

  menu.classList.toggle('show');
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
  }
});

// --- Tabs ---
function switchTab(tabGroup, tabId) {
  // Update tab buttons
  document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab`).forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab-group="${tabGroup}"] [data-tab="${tabId}"]`).classList.add('active');

  // Update tab content
  document.querySelectorAll(`[data-tab-content-group="${tabGroup}"] .tab-content`).forEach(c => c.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// --- Utility Functions ---
function capitalizeRole(role) {
  const roles = {
    'admin': 'Administrator',
    'manager': 'Sales Manager',
    'inspector': 'Inspector',
    'customer': 'Customer'
  };
  return roles[role] || role;
}

function toggleUserMenu() {
  let menu = document.getElementById('user-popover-menu');
  if (menu) {
    menu.classList.toggle('show');
    return;
  }

  const currentUser = getCurrentUser();

  menu = document.createElement('div');
  menu.id = 'user-popover-menu';
  menu.className = 'user-popover-menu show';
  menu.innerHTML = `
    <div class="user-popover-header">
      <div class="user-avatar" style="width:40px;height:40px;border-radius:50%;background:var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:var(--text-sm);font-weight:var(--font-semibold);color:white;flex-shrink:0">${currentUser.avatar}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:var(--font-semibold);font-size:var(--text-sm);color:var(--text-primary)">${currentUser.name}</div>
        <div style="font-size:var(--text-xs);color:var(--text-tertiary)">${currentUser.email}</div>
      </div>
    </div>
    <div class="user-popover-body">
      <button class="user-popover-item" onclick="showToast('info','Profile','Edit Profile coming soon')">
        <i class="fas fa-user-pen"></i>
        <span>Edit Profile</span>
      </button>
      <button class="user-popover-item" onclick="showToast('info','Settings','Account Settings coming soon')">
        <i class="fas fa-gear"></i>
        <span>Account Settings</span>
      </button>
      <button class="user-popover-item" onclick="showToast('info','Help','Help & Support coming soon')">
        <i class="fas fa-circle-question"></i>
        <span>Help & Support</span>
      </button>
    </div>
    <div class="user-popover-footer">
      <button class="user-popover-item danger" onclick="handleSignOut()">
        <i class="fas fa-right-from-bracket"></i>
        <span>Sign Out</span>
      </button>
    </div>
  `;

  const sidebar = document.getElementById('sidebar');
  const isCollapsed = sidebar && sidebar.classList.contains('collapsed');

  if (isCollapsed) {
    // Append to body with fixed positioning to avoid sidebar overflow clipping
    document.body.appendChild(menu);
    menu.classList.add('popover-fixed');
    const userBtn = document.querySelector('.sidebar-user');
    if (userBtn) {
      const rect = userBtn.getBoundingClientRect();
      menu.style.position = 'fixed';
      menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
      menu.style.left = (rect.left) + 'px';
      menu.style.width = '260px';
    }
  } else {
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter) {
      sidebarFooter.appendChild(menu);
    }
  }

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target) && !e.target.closest('.sidebar-user')) {
        menu.classList.remove('show');
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 10);
}

function handleSignOut() {
  const menu = document.getElementById('user-popover-menu');
  if (menu) menu.classList.remove('show');
  showConfirmDialog(
    'Sign Out',
    'Are you sure you want to sign out of AutoInspect Pro?',
    logout
  );
}

function toggleNotifications() {
  toggleNotificationCentre();
}

// --- Keyboard Shortcuts ---
document.addEventListener('keydown', (e) => {
  // Escape to close modals, menus, and sidebar
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });
    const userMenu = document.getElementById('user-popover-menu');
    if (userMenu) userMenu.classList.remove('show');
    const notifPanel = document.getElementById('notification-panel');
    if (notifPanel) notifPanel.classList.remove('show');
    closeSidebar();
  }
});

// --- VIN Validation ---
function validateVIN(vin) {
  if (!vin || vin.length !== 17) return { valid: false, error: 'VIN must be exactly 17 characters' };
  if (/[IOQ]/i.test(vin)) return { valid: false, error: 'VIN cannot contain letters I, O, or Q' };
  if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) return { valid: false, error: 'VIN contains invalid characters' };
  // Check digit validation (position 9)
  const transliteration = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9 };
  const weights = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const c = vin[i].toUpperCase();
    const val = isNaN(c) ? (transliteration[c] || 0) : parseInt(c);
    sum += val * weights[i];
  }
  const checkDigit = sum % 11;
  const expected = checkDigit === 10 ? 'X' : String(checkDigit);
  // Note: check digit validation is advisory only since many real VINs don't strictly follow
  return { valid: true, checkDigitMatch: vin[8].toUpperCase() === expected };
}

// --- Grading Algorithm (PRD Section 5.9) ---
function calculateInspectionGrade(checklistState, damageMarkers, obdSnapshot) {
  let passCount = 0, failCount = 0, advisoryCount = 0, naCount = 0, totalItems = 0;

  Object.values(checklistState).forEach(item => {
    totalItems++;
    if (item.status === 'pass') passCount++;
    else if (item.status === 'fail') failCount++;
    else if (item.status === 'advisory') advisoryCount++;
    else if (item.status === 'na') naCount++;
  });

  const scoredItems = totalItems - naCount;
  if (scoredItems === 0) return { score: 0, grade: 'N/A', passCount, failCount, advisoryCount, naCount };

  let score = ((passCount + (advisoryCount * 0.5)) / scoredItems) * 100;

  // Damage penalties
  if (damageMarkers && damageMarkers.length > 0) {
    damageMarkers.forEach(m => {
      if (m.severity === 'major') score -= 3;
      else if (m.severity === 'moderate') score -= 1.5;
      else if (m.severity === 'minor') score -= 0.5;
    });
  }

  // OBD penalties
  if (obdSnapshot && obdSnapshot.dtcCodes) {
    obdSnapshot.dtcCodes.forEach(dtc => {
      if (dtc.severity === 'critical') score -= 5;
      else if (dtc.severity === 'warning') score -= 2;
    });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let grade;
  if (score >= 95) grade = 'A+';
  else if (score >= 90) grade = 'A';
  else if (score >= 85) grade = 'A-';
  else if (score >= 80) grade = 'B+';
  else if (score >= 75) grade = 'B';
  else if (score >= 70) grade = 'B-';
  else if (score >= 65) grade = 'C+';
  else if (score >= 60) grade = 'C';
  else if (score >= 55) grade = 'C-';
  else if (score >= 50) grade = 'D';
  else grade = 'F';

  return { score, grade, passCount, failCount, advisoryCount, naCount, totalItems };
}

function calculateSectionScore(checklistState, sectionKey) {
  let pass = 0, advisory = 0, total = 0, na = 0;
  Object.entries(checklistState).forEach(([key, item]) => {
    if (key.startsWith(sectionKey + '_')) {
      total++;
      if (item.status === 'pass') pass++;
      else if (item.status === 'advisory') advisory++;
      else if (item.status === 'na') na++;
    }
  });
  const scored = total - na;
  if (scored === 0) return 0;
  return Math.round(((pass + advisory * 0.5) / scored) * 100);
}

// --- Auto-save Manager ---
const AutoSave = {
  _interval: null,
  _key: 'autoinspect_draft',

  start(getStateFunc) {
    this._getState = getStateFunc;
    this._interval = setInterval(() => this.save(), 30000);
    this.save(); // Initial save
  },

  save() {
    if (!this._getState) return;
    const state = this._getState();
    localStorage.setItem(this._key, JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
    const indicator = document.getElementById('autosave-indicator');
    if (indicator) {
      indicator.textContent = 'Saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      indicator.classList.add('saved');
      setTimeout(() => indicator.classList.remove('saved'), 2000);
    }
  },

  load() {
    const data = localStorage.getItem(this._key);
    return data ? JSON.parse(data) : null;
  },

  clear() {
    localStorage.removeItem(this._key);
    if (this._interval) clearInterval(this._interval);
  },

  stop() {
    if (this._interval) clearInterval(this._interval);
  }
};

// --- Notification Centre ---
function toggleNotificationCentre() {
  let panel = document.getElementById('notification-panel');
  if (panel) {
    panel.classList.toggle('show');
    return;
  }

  const notifications = (typeof MOCK_DATA !== 'undefined' && MOCK_DATA.notifications) ? MOCK_DATA.notifications : [];
  const unreadCount = notifications.filter(n => !n.readAt).length;

  panel = document.createElement('div');
  panel.id = 'notification-panel';
  panel.className = 'notification-panel show';
  panel.innerHTML = `
    <div class="notification-panel-header">
      <h4>Notifications</h4>
      <span class="badge badge-info">${unreadCount} new</span>
    </div>
    <div class="notification-panel-body">
      ${notifications.length === 0 ? '<div class="empty-state" style="padding:var(--space-6);text-align:center"><i class="fas fa-bell-slash" style="font-size:1.5rem;color:var(--color-gray-400)"></i><p style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">No notifications</p></div>' :
        notifications.map(n => {
          const icons = { inspection_completed: 'fa-clipboard-check', inspection_approved: 'fa-check-circle', critical_defect: 'fa-exclamation-triangle', report_viewed: 'fa-eye', user_invited: 'fa-user-plus', system: 'fa-gear' };
          const colors = { inspection_completed: 'var(--color-primary)', inspection_approved: 'var(--color-success)', critical_defect: 'var(--color-danger)', report_viewed: 'var(--color-info)', user_invited: 'var(--color-accent)', system: 'var(--color-gray-500)' };
          return `
            <div class="notification-item ${n.readAt ? 'read' : 'unread'}">
              <div class="notification-icon" style="color:${colors[n.type] || 'var(--color-gray-500)'}">
                <i class="fas ${icons[n.type] || 'fa-bell'}"></i>
              </div>
              <div class="notification-content">
                <div class="notification-title">${n.title}</div>
                <div class="notification-message">${n.message}</div>
                <div class="notification-time">${formatDateTime(n.createdAt)}</div>
              </div>
              ${!n.readAt ? '<div class="notification-dot-unread"></div>' : ''}
            </div>
          `;
        }).join('')}
    </div>
    <div class="notification-panel-footer">
      <button class="btn btn-ghost btn-sm" onclick="markAllNotificationsRead()">Mark all as read</button>
    </div>
  `;

  document.body.appendChild(panel);

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', function closePanel(e) {
      if (!panel.contains(e.target) && !e.target.closest('[data-tooltip="Notifications"]')) {
        panel.classList.remove('show');
        document.removeEventListener('click', closePanel);
      }
    });
  }, 100);
}

function markAllNotificationsRead() {
  if (typeof MOCK_DATA !== 'undefined' && MOCK_DATA.notifications) {
    MOCK_DATA.notifications.forEach(n => { if (!n.readAt) n.readAt = new Date().toISOString(); });
  }
  document.querySelectorAll('.notification-item.unread').forEach(el => el.classList.replace('unread', 'read'));
  document.querySelectorAll('.notification-dot-unread').forEach(el => el.remove());
  const badge = document.querySelector('.notification-panel-header .badge');
  if (badge) badge.textContent = '0 new';
  // Update header dot
  const headerDot = document.querySelector('.notification-dot');
  if (headerDot) headerDot.style.display = 'none';
  showToast('success', 'Notifications', 'All notifications marked as read');
}

// --- Confirm Dialog ---
function showConfirmDialog(title, message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'confirm-dialog';
  overlay.innerHTML = `
    <div class="modal" style="max-width:min(420px, 95vw)">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove();document.body.style.overflow=''"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <p style="color:var(--text-secondary)">${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
        <button class="btn btn-danger" id="confirm-ok">Confirm</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.querySelector('#confirm-ok').onclick = () => {
    overlay.remove();
    document.body.style.overflow = '';
    if (onConfirm) onConfirm();
  };
  overlay.querySelector('#confirm-cancel').onclick = () => {
    overlay.remove();
    document.body.style.overflow = '';
    if (onCancel) onCancel();
  };
}

// --- Form Validation ---
function validateForm(formFields) {
  let isValid = true;
  const errors = [];

  formFields.forEach(({ id, label, required, type, minLength, maxLength, pattern }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const value = el.value.trim();

    // Remove previous error state
    el.classList.remove('input-error');
    const prevError = el.parentElement.querySelector('.field-error');
    if (prevError) prevError.remove();

    let error = null;
    if (required && !value) {
      error = `${label} is required`;
    } else if (value && minLength && value.length < minLength) {
      error = `${label} must be at least ${minLength} characters`;
    } else if (value && maxLength && value.length > maxLength) {
      error = `${label} must be no more than ${maxLength} characters`;
    } else if (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (value && pattern && !pattern.test(value)) {
      error = `${label} format is invalid`;
    }

    if (error) {
      isValid = false;
      errors.push(error);
      el.classList.add('input-error');
      const errorEl = document.createElement('div');
      errorEl.className = 'field-error';
      errorEl.textContent = error;
      el.parentElement.appendChild(errorEl);
    }
  });

  return { isValid, errors };
}

// --- Mobile Bottom Navigation ---
function renderMobileNav(activeItem) {
  if (document.getElementById('mobile-bottom-nav')) return;

  const nav = document.createElement('nav');
  nav.id = 'mobile-bottom-nav';
  nav.className = 'mobile-bottom-nav';
  nav.setAttribute('aria-label', 'Mobile navigation');

  const currentUser = getCurrentUser();
  const items = [
    { id: 'dashboard', label: 'Home', icon: 'fa-th-large', href: 'dashboard.html' },
    { id: 'inspections', label: 'Inspections', icon: 'fa-clipboard-check', href: 'inspections.html', badge: '3' },
    { id: 'new-inspection', label: 'New', icon: 'fa-plus-circle', href: 'new-inspection.html' },
    { id: 'vehicles', label: 'Vehicles', icon: 'fa-car-side', href: 'vehicles.html' },
  ];

  // Add analytics for non-inspectors
  if (currentUser.role !== 'inspector') {
    items.push({ id: 'analytics', label: 'Analytics', icon: 'fa-chart-bar', href: 'analytics.html' });
  } else {
    items.push({ id: 'more', label: 'More', icon: 'fa-bars', href: '#', onclick: 'toggleSidebar()' });
  }

  nav.innerHTML = `<div class="mobile-bottom-nav-inner">
    ${items.map(item => `
      <a href="${item.href}" class="mobile-bottom-nav-item ${activeItem === item.id ? 'active' : ''}"
        ${item.onclick ? `onclick="${item.onclick};return false;"` : ''}
        aria-label="${item.label}">
        <i class="fas ${item.icon}"></i>
        <span>${item.label}</span>
        ${item.badge ? `<span class="nav-badge-mobile">${item.badge}</span>` : ''}
      </a>
    `).join('')}
  </div>`;

  document.body.appendChild(nav);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Create overlay for mobile sidebar
  if (!document.getElementById('sidebar-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    overlay.onclick = closeSidebar;
    document.body.appendChild(overlay);
  }

  // Create toast container
  if (!document.getElementById('toast-container')) {
    createToastContainer();
  }
});
