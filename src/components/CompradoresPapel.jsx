import React, { useState } from 'react';

const CompradoresPapel = ({ dados, updateDados }) => {
  const [search, setSearch] = useState('');
  const { buyerProf } = dados;

  const filtered = buyerProf.filter(item =>
    item.comprador.toLowerCase().includes(search.toLowerCase()) ||
    item.sprint.toString().includes(search)
  );

  const handleChange = (index, field, value) => {
    updateDados(`buyerProf.${index}.${field}`, value);
  };

  return (
    <div className="panel">
      <h2>Compradores (Papel)</h2>
      <div className="desc">
        Avaliação do desempenho de cada comprador por sprint.
      </div>

      <div className="roster-search">
        <input
          type="text"
          placeholder="Filtrar por comprador ou sprint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="roster-table">
          <thead>
            <tr>
              <th>Sprint</th>
              <th>Comprador</th>
              <th>Checklist</th>
              <th>Decisões</th>
              <th>Feedback</th>
              <th>Nota</th>
              <th>Obs</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => {
              // Índice original para updateDados
              const originalIndex = buyerProf.indexOf(item);
              return (
                <tr key={`${item.sprint}-${item.comprador}`}>
                  <td>{item.sprint}</td>
                  <td>{item.comprador}</td>
                  <td>
                    <input
                      type="text"
                      value={item.checklist || ''}
                      onChange={(e) => handleChange(originalIndex, 'checklist', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.decisoes || ''}
                      onChange={(e) => handleChange(originalIndex, 'decisoes', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.feedback || ''}
                      onChange={(e) => handleChange(originalIndex, 'feedback', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.nota || ''}
                      onChange={(e) => handleChange(originalIndex, 'nota', e.target.value)}
                      className="form-control"
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.obs || ''}
                      onChange={(e) => handleChange(originalIndex, 'obs', e.target.value)}
                      className="form-control"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: '1rem' }}>
        Total de {filtered.length} registros exibidos (de {buyerProf.length}).
      </div>
    </div>
  );
};

export default CompradoresPapel;