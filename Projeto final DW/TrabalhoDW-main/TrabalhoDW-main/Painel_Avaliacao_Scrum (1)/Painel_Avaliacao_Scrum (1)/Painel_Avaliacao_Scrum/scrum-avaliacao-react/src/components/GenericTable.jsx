
export default function GenericTable({
  rows,
  columns,
  updateField,
  sprintKey = 'sprint',
  title,
  desc,
  note
}) {
  const getSprintLabel = (index) => {
    if (index === 0) return 'Sprint ' + rows[index][sprintKey];
    if (rows[index][sprintKey] !== rows[index - 1][sprintKey]) {
      return 'Sprint ' + rows[index][sprintKey];
    }
    return '';
  };

  const renderField = (row, col, rowIndex) => {
    const value = row[col.key] ?? '';

    switch (col.type) {
      case 'text':
        return (
          <input
            className="obs-input"
            type="text"
            value={value}
            onChange={(e) => updateField(rowIndex, col.key, e.target.value)}
            placeholder={col.placeholder || ''}
          />
        );
      case 'sn':
        return (
          <select
            value={value}
            onChange={(e) => updateField(rowIndex, col.key, e.target.value)}
          >
            <option value="">—</option>
            <option value="S">Sim</option>
            <option value="N">Não</option>
          </select>
        );
      case 'score':
        return (
          <select
            value={value}
            onChange={(e) => updateField(rowIndex, col.key, e.target.value)}
          >
            <option value="">—</option>
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        );
      case 'decisao':
        return (
          <select
            value={value}
            onChange={(e) => updateField(rowIndex, col.key, e.target.value)}
          >
            <option value="">—</option>
            <option value="A">Aceitou</option>
            <option value="I">Ignorou</option>
            <option value="D">Denunciou</option>
          </select>
        );
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <div className="panel">
      <h2>{title}</h2>
      <div className="desc">{desc}</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="sprint-label">{getSprintLabel(i)}</td>
              {columns.map(col => (
                <td key={col.key}>
                  {renderField(row, col, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <div className="note note-dark">{note}</div>}
    </div>
  );
}