import { useState } from 'react';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Tab1');

  return (
    <div>
      <div>
        <button data-testid="tab1Button" onClick={() => setActiveTab('Tab1')}>Tab 1</button>
        <button data-testid="tab2Button" onClick={() => setActiveTab('Tab2')}>Tab 2</button>
        <button data-testid="tab3Button" onClick={() => setActiveTab('Tab3')}>Tab 3</button>
      </div>
      <div>
        {activeTab === 'Tab1' && <p data-testid="tab1Content">Content of Tab 1</p>}
        {activeTab === 'Tab2' && <p data-testid="tab2Content">Content of Tab 2</p>}
        {activeTab === 'Tab3' && <p data-testid="tab3Content">Content of Tab 3</p>}
      </div>
    </div>
  );
};
