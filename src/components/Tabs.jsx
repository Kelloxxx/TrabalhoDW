export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`tab ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
