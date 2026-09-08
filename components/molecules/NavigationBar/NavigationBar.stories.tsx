import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import NavigationBar from './index';

const meta: Meta<typeof NavigationBar> = {
  title: 'Molecules/Navigation/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  argTypes: {
    showLabels: { control: 'boolean' },
    activeColor: {
      control: 'select',
      options: ['primary', 'info', 'danger', 'neutral', 'warning'],
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

const DefaultNavigationBarWrapper = (args: any) => {
  const [activeKey, setActiveKey] = useState('home');

  const items = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      href: '#home',
    },
    {
      key: 'wallet',
      icon: 'account_balance_wallet',
      label: 'Wallet',
      href: '#wallet',
    },
    {
      key: 'analytics',
      icon: 'analytics',
      label: 'Analytics',
      href: '#analytics',
    },
    {
      key: 'settings',
      icon: 'settings',
      label: 'Settings',
      href: '#settings',
    },
  ];

  return (
    <div style={{ 
      minHeight: '400px', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'flex-end',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f9fafb' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>
          Current Page: {activeKey.charAt(0).toUpperCase() + activeKey.slice(1)}
        </h2>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          Click navigation items to change the active tab
        </p>
      </div>
      <NavigationBar
        {...args}
        items={items}
        activeKey={activeKey}
        onNavigate={(key) => setActiveKey(key)}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DefaultNavigationBarWrapper {...args} />,
  args: {
    showLabels: true,
    activeColor: 'primary',
    position: 'bottom',
  },
};

