// src/app/dashboard/layout.tsx
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Home,
  PlusSquare,
  List,
  CheckSquare,
  FileText,
  LogOut,
} from 'lucide-react';
import './dashboard.css';

const navItems = [
  { href: '/dashboard', label: 'ダッシュボード', Icon: Home },
  { href: '/dashboard/new-trip', label: '旅行新規作成', Icon: PlusSquare },
  { href: '/dashboard/trips', label: '旅行一覧', Icon: List },
  { href: '/dashboard/checklist', label: 'チェックリスト', Icon: CheckSquare },
  { href: '/dashboard/shiori', label: 'しおりフォーマット', Icon: FileText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-container">
      {/* Hamburger button */}
      <button
        className="hamburger"
        onClick={toggleSidebar}
        aria-label="メニュー"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>  
        <div className="logo">Tabi no Shiori</div>
        <nav className="nav">
          {navItems.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="nav-link">
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="user-section">
          <div className="avatar">U</div>
          <button className="logout-button">
            <LogOut size={18} />
            <span>ログアウト</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar} />}

      {/* Main content */}
      <main className="main-content" onClick={closeSidebar}>
        {children}
      </main>
    </div>
  );
}