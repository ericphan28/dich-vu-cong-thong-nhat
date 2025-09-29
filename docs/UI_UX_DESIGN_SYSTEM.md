# 🎨 UI_UX_DESIGN_SYSTEM.md

## 🎯 DESIGN PHILOSOPHY

### Core Principles
- **Mobile-First:** 70% người dùng truy cập từ điện thoại
- **Accessibility:** Phục vụ mọi độ tuổi (18-80 tuổi)  
- **Trust & Credibility:** Colors và typography tạo niềm tin
- **Simplicity:** Ít click, ít form, ít confusion
- **Vietnamese Context:** Phù hợp văn hóa và hành vi người Việt

---

## 🎨 COLOR SYSTEM

### Primary Brand Colors  
```css
/* Blue - Trust & Reliability */
--primary-50: #eff6ff
--primary-100: #dbeafe  
--primary-500: #3b82f6  /* Main brand blue */
--primary-600: #2563eb
--primary-900: #1e3a8a

/* Orange - Warmth & Approachable */  
--accent-50: #fff7ed
--accent-100: #ffedd5
--accent-500: #f97316  /* CTA orange */
--accent-600: #ea580c
--accent-900: #9a3412
```

### Semantic Colors
```css  
/* Success - Completed orders */
--success-50: #f0fdf4
--success-500: #22c55e
--success-600: #16a34a

/* Warning - Pending status */
--warning-50: #fefce8  
--warning-500: #eab308
--warning-600: #ca8a04

/* Error - Failed/Rejected */
--error-50: #fef2f2
--error-500: #ef4444
--error-600: #dc2626

/* Info - Processing status */  
--info-50: #f0f9ff
--info-500: #06b6d4
--info-600: #0891b2
```

### Neutral Colors (Light/Dark Mode)
```css
/* Light Mode */
--background: #ffffff
--foreground: #0f172a  
--muted: #f1f5f9
--muted-foreground: #64748b
--border: #e2e8f0
--card: #ffffff
--card-foreground: #0f172a

/* Dark Mode */  
--dark-background: #0f172a
--dark-foreground: #f1f5f9
--dark-muted: #1e293b  
--dark-muted-foreground: #94a3b8
--dark-border: #334155
--dark-card: #1e293b
--dark-card-foreground: #f1f5f9
```

---

## 📝 TYPOGRAPHY SYSTEM

### Font Family
```css
/* Primary Font - Inter (Vietnamese support) */
font-family: "Inter", "Segoe UI", system-ui, sans-serif

/* Fallback for Government Documents */
font-family: "Times New Roman", serif
```

### Type Scale  
```css
/* Headings */
--text-xs: 0.75rem     /* 12px - Small labels */
--text-sm: 0.875rem    /* 14px - Body text */  
--text-base: 1rem      /* 16px - Default body */
--text-lg: 1.125rem    /* 18px - Large body */
--text-xl: 1.25rem     /* 20px - H4 */
--text-2xl: 1.5rem     /* 24px - H3 */  
--text-3xl: 1.875rem   /* 30px - H2 */
--text-4xl: 2.25rem    /* 36px - H1 */
--text-5xl: 3rem       /* 48px - Hero title */
```

### Font Weights
```css  
--font-light: 300      /* Subtle text */
--font-normal: 400     /* Body text */
--font-medium: 500     /* Emphasis */  
--font-semibold: 600   /* Headings */
--font-bold: 700       /* Strong emphasis */
--font-extrabold: 800  /* Hero titles */
```

---

## 📏 SPACING & LAYOUT SYSTEM  

### Spacing Scale (Tailwind-based)
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */  
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */  
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
```

### Container Sizes
```css
/* Mobile First Containers */  
--container-sm: 640px   /* Small screens */
--container-md: 768px   /* Medium screens */
--container-lg: 1024px  /* Large screens */  
--container-xl: 1280px  /* Extra large */
--container-2xl: 1536px /* Maximum width */
```

### Grid System  
```css
/* 12-column grid system */
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); }

/* Common Layouts */
.grid-2-cols { grid-template-columns: repeat(2, 1fr); }  
.grid-3-cols { grid-template-columns: repeat(3, 1fr); }
.grid-4-cols { grid-template-columns: repeat(4, 1fr); }

/* Responsive Breakpoints */  
.grid-sm-1 { /* 1 col on mobile */ }
.grid-md-2 { /* 2 cols on tablet */ }
.grid-lg-3 { /* 3 cols on desktop */ }
```

---

## 🔲 COMPONENT DESIGN TOKENS

### Buttons
```css  
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;  
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-primary:hover {
  background: var(--primary-600);  
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Secondary Button */  
.btn-secondary {
  background: transparent;
  color: var(--primary-600);
  border: 1px solid var(--border);
  padding: 0.75rem 1.5rem;  
  border-radius: 0.5rem;
}

/* CTA Button (Orange) */
.btn-cta {
  background: var(--accent-500);  
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;  
}
```

### Cards  
```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;  
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.card:hover {  
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Service Card */
.service-card {  
  background: white;
  border: 2px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;  
  transition: all 0.3s;
}

.service-card:hover {
  border-color: var(--primary-500);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);  
}
```

### Forms
```css
.input {  
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;  
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);  
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.label {
  display: block;  
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--foreground);
}
```

---

## 📱 RESPONSIVE DESIGN SYSTEM  

### Breakpoints
```css
/* Mobile First Approach */
/* Base: 0px - 639px (Mobile) */

@media (min-width: 640px) {  
  /* sm: Small tablets */
}

@media (min-width: 768px) {
  /* md: Tablets */  
}

@media (min-width: 1024px) {
  /* lg: Desktop */
}

@media (min-width: 1280px) {  
  /* xl: Large desktop */
}
```

### Layout Patterns
```css
/* Mobile: Stack vertically */
.responsive-grid {  
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 columns */  
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;  
  }
}

/* Desktop: 3-4 columns */
@media (min-width: 1024px) {
  .responsive-grid {  
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

---

## 🌙 DARK MODE SYSTEM

### Theme Toggle Implementation  
```css
/* CSS Variables for Theme Switching */
:root {
  --background: #ffffff;  
  --foreground: #0f172a;
}

[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f1f5f9;  
}

/* Automatic Theme Switching */
@media (prefers-color-scheme: dark) {
  :root {  
    --background: #0f172a;
    --foreground: #f1f5f9;
  }
}
```

### Dark Mode Color Adjustments
```css  
/* Dark mode specific tweaks */
[data-theme="dark"] {
  /* Reduce contrast for comfort */
  --primary-500: #60a5fa;  /* Lighter blue */
  --accent-500: #fb923c;   /* Lighter orange */
  
  /* Card backgrounds */  
  --card: #1e293b;
  --muted: #334155;
}
```

---

## ✨ ANIMATION & TRANSITIONS

### Micro-Interactions  
```css
/* Hover Effects */
.interactive {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive:hover {  
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Loading States */
@keyframes spin {  
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Fade In Animation */  
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {  
  animation: fadeIn 0.3s ease-out;
}

/* Slide Up Animation */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }  
  to { opacity: 1; transform: translateY(0); }
}

.slide-up {
  animation: slideUp 0.4s ease-out;  
}
```

### Page Transitions
```css
/* Page enter/exit animations */  
.page-enter {
  opacity: 0;
  transform: translateX(10px);
}

.page-enter-active {  
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease-in-out;
}
```

---

## 🔧 COMPONENT VARIATIONS

### Status Indicators  
```css
.status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;  
  font-weight: 500;
}

.status-pending {
  background: var(--warning-50);
  color: var(--warning-600);  
}

.status-processing {
  background: var(--info-50);
  color: var(--info-600);
}  

.status-completed {
  background: var(--success-50);
  color: var(--success-600);
}

.status-failed {  
  background: var(--error-50);
  color: var(--error-600);
}
```

### Progress Indicators
```css  
.progress {
  width: 100%;
  height: 0.5rem;
  background: var(--muted);
  border-radius: 9999px;  
  overflow: hidden;
}

.progress-bar {
  height: 100%;  
  background: var(--primary-500);
  transition: width 0.3s ease-in-out;
  border-radius: inherit;
}
```

### Toast Notifications  
```css
.toast {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;  
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  max-width: 400px;
}

.toast-success {  
  border-color: var(--success-500);
}

.toast-error {
  border-color: var(--error-500);
}  

.toast-info {
  border-color: var(--info-500);
}
```

---

## 📐 ICON SYSTEM

### Icon Guidelines  
- **Style:** Outlined icons (Heroicons, Lucide)
- **Size:** 16px (sm), 20px (md), 24px (lg), 32px (xl)  
- **Stroke:** 1.5px weight
- **Color:** Inherit from parent or semantic colors

### Common Icons
```typescript  
// Service Category Icons
const serviceIcons = {
  identity: 'identification',    // Giấy tờ tùy thân
  civil: 'home',                // Hộ tịch dân cư  
  legal: 'scale',               // Pháp lý công chứng
  transport: 'truck',           // Giao thông phương tiện
  utility: 'lightning-bolt'     // Tiện ích  
}

// Status Icons
const statusIcons = {  
  pending: 'clock',
  processing: 'cog',
  completed: 'check-circle',
  failed: 'x-circle'
}
```

---

## 🎭 ACCESSIBILITY GUIDELINES

### Color Contrast  
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text:** 3:1 minimum contrast ratio  
- **Interactive elements:** 3:1 for focus indicators

### Keyboard Navigation
```css
/* Focus styles */  
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Skip to content */
.skip-link {  
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-500);
  color: white;  
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 6px;  
}
```

### Screen Reader Support  
```html
<!-- ARIA labels for Vietnamese content -->
<button aria-label="Gửi đơn đăng ký">  
  <PaperAirplaneIcon aria-hidden="true" />
</button>

<!-- Status announcements -->
<div aria-live="polite" id="status">  
  Đơn của bạn đã được gửi thành công
</div>
```

---

## 📊 DESIGN METRICS & TESTING

### Performance Metrics  
- **First Paint:** <1.5 seconds
- **Largest Contentful Paint:** <2.5 seconds  
- **Cumulative Layout Shift:** <0.1
- **Time to Interactive:** <3 seconds

### Usability Metrics
- **Task Completion Rate:** >90%  
- **Task Completion Time:** <2 minutes average
- **User Error Rate:** <5%
- **System Usability Scale:** >80

### A/B Testing Targets
- **CTA Button Colors:** Orange vs Blue  
- **Service Card Layout:** Grid vs List
- **Form Fields:** Single page vs Multi-step
- **Pricing Display:** Prominent vs Subtle

---

## 🔄 DESIGN SYSTEM MAINTENANCE  

### Version Control
- **Major:** Breaking changes (1.0.0 → 2.0.0)  
- **Minor:** New components (1.1.0 → 1.2.0)
- **Patch:** Bug fixes (1.1.1 → 1.1.2)

### Documentation Updates
- **Component props:** TypeScript interfaces  
- **Usage examples:** Storybook stories
- **Design tokens:** Figma variables sync
- **Accessibility notes:** WCAG compliance

### Browser Testing Matrix
- **Chrome:** Latest 2 versions  
- **Safari:** Latest 2 versions (iOS/macOS)
- **Firefox:** Latest 2 versions
- **Edge:** Latest 2 versions
- **Mobile:** Chrome Mobile, Safari iOS

Hệ thống design này đảm bảo tính nhất quán và khả năng mở rộng cho toàn bộ dự án! 🎨