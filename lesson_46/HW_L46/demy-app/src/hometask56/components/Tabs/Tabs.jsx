import { useState } from 'react';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Tab1');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('Tab1')}>Tab 1</button>
        <button onClick={() => setActiveTab('Tab2')}>Tab 2</button>
        <button onClick={() => setActiveTab('Tab3')}>Tab 3</button>
      </div>
      <div>
        {activeTab === 'Tab1' && <p>Content of Tab 1</p>}
        {activeTab === 'Tab2' && <p>Content of Tab 2</p>}
        {activeTab === 'Tab3' && <p>Content of Tab 3</p>}
      </div>
    </div>
  );
};
