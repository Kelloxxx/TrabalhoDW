


export function CampoSimNao({ value, onChange }) {
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="S">Sim</option>
      <option value="N">Não</option>
    </select>
  );
}


export function CampoNota({ value, onChange }) {
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {[1,2,3,4,5].map(n => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  );
}


export function CampoObs({ value, onChange, placeholder = 'Obs...' }) {
  return (
    <input
      className="obs-input"
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}