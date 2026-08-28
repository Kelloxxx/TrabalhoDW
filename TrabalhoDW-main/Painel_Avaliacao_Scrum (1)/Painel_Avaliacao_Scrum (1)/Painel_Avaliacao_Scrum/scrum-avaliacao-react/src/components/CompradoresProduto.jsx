import React, { useState } from 'react';

const CompradoresProduto = ({ dados, updateDados }) => {
  const [search, setSearch] = useState('');
  const { buyerProduct } = dados;

  const filtered = buyerProduct.filter(item =>
    item.comprador.toLowerCase().includes(search.toLowerCase()) ||
    item.empresa.toLowerCase().includes(search.toLowerCase()) ||
    item.produto.toLowerCase().includes(search.toLowerCase()) ||
    item.sprint.toString().includes(search)
  );

  const handleChange = (index, field, value) => {
    updateDados(`buyerProduct.${index}.${field}`, value);
  };

  return (
    <div className="panel">
      <h2>Compradores (Produto)</h2>
      <div className="desc">
        Avaliação detalhada por produto adquirido por cada comprador, por sprint e empresa.
      </div>

      <div className="roster-search">
        <input
          type="text"
          placeholder="Filtrar por comprador, empresa, produto ou sprint..."
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
              <th>Empresa</th>
              <th>Produto</th>
              <th>PT</th>
              <th>PV</th>
              <th>Prazo</th>
              <th>Com Owner</th>
              <th>Sinal</th>
              <th>Decisão</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => {
              const originalIndex = buyerProduct.indexOf(item);
              return (
                <tr key={`${item.sprint}-${item.comprador}-${item.empresa}-${item.produto}`}>
                  <td>{item.sprint}</td>
                  <td>{item.comprador}</td>
                  <td>{item.empresa}</td>
                  <td>{item.produto}</td>
                  <td>
                    <input
                      type="text"
                      value={item.pt || ''}
                      onChange={(e) => handleChange(originalIndex, 'pt', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.pv || ''}
                      onChange={(e) => handleChange(originalIndex, 'pv', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.prazo || ''}
                      onChange={(e) => handleChange(originalIndex, 'prazo', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.comOwner || ''}
                      onChange={(e) => handleChange(originalIndex, 'comOwner', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.sinal || ''}
                      onChange={(e) => handleChange(originalIndex, 'sinal', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.decisao || ''}
                      onChange={(e) => handleChange(originalIndex, 'decisao', e.target.value)}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: '1rem' }}>
        Total de {filtered.length} registros exibidos (de {buyerProduct.length}).
      </div>
    </div>
  );
};

export default CompradoresProduto;