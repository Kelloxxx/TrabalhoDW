import React from 'react';

function Corrupcao({ dados, updateDados }) {
  const corrupcao = dados.corrupcao || {};

  const empresas = [
    dados.meta?.empresaA,
    dados.meta?.empresaB
  ].filter(Boolean);

  const compradores = [
    'Governo',
    'Militar',
    'Setor Privado'
  ];

  return (
    <div className="panel">
      <h2>Corrupção</h2>

      <p>
        Registre aqui os acontecimentos relacionados à corrupção durante a
        avaliação.
      </p>

      <div className="form-grid">

        <div className="form-group">
          <label>Empresa corruptora</label>

          <select
            value={corrupcao.empresaCorruptora || ''}
            onChange={(e) =>
              updateDados('corrupcao.empresaCorruptora', e.target.value)
            }
          >
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>
                {empresa}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Primeira descoberta</label>

          <select
            value={corrupcao.primeiraDescoberta ? 'sim' : 'nao'}
            onChange={(e) =>
              updateDados(
                'corrupcao.primeiraDescoberta',
                e.target.value === 'sim'
              )
            }
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        {corrupcao.primeiraDescoberta && (
          <div className="form-group">
            <label>Primeiro comprador que descobriu</label>

            <select
              value={corrupcao.primeiroComprador || ''}
              onChange={(e) =>
                updateDados(
                  'corrupcao.primeiroComprador',
                  e.target.value
                )
              }
            >
              <option value="">Selecione...</option>

              {compradores.map((comprador) => (
                <option key={comprador} value={comprador}>
                  {comprador}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Segunda descoberta</label>

          <select
            value={corrupcao.segundaDescoberta ? 'sim' : 'nao'}
            onChange={(e) =>
              updateDados(
                'corrupcao.segundaDescoberta',
                e.target.value === 'sim'
              )
            }
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        {corrupcao.segundaDescoberta && (
          <div className="form-group">
            <label>Segundo comprador que descobriu</label>

            <select
              value={corrupcao.segundoComprador || ''}
              onChange={(e) =>
                updateDados(
                  'corrupcao.segundoComprador',
                  e.target.value
                )
              }
            >
              <option value="">Selecione...</option>

              {compradores.map((comprador) => (
                <option key={comprador} value={comprador}>
                  {comprador}
                </option>
              ))}
            </select>
          </div>
        )}

      </div>

      <div className="result-box">
        <h3>Resumo da corrupção</h3>

        <p>
          <strong>Empresa corruptora:</strong>{' '}
          {corrupcao.empresaCorruptora || 'Não definida'}
        </p>

        <p>
          <strong>Primeira descoberta:</strong>{' '}
          {corrupcao.primeiraDescoberta ? 'Sim' : 'Não'}
        </p>

        {corrupcao.primeiraDescoberta && (
          <p>
            <strong>Primeiro comprador:</strong>{' '}
            {corrupcao.primeiroComprador || 'Não informado'}
          </p>
        )}

        <p>
          <strong>Segunda descoberta:</strong>{' '}
          {corrupcao.segundaDescoberta ? 'Sim' : 'Não'}
        </p>

        {corrupcao.segundaDescoberta && (
          <p>
            <strong>Segundo comprador:</strong>{' '}
            {corrupcao.segundoComprador || 'Não informado'}
          </p>
        )}

        <p className="warning">
          Cada corrupção descoberta gera -1 ponto para a empresa corruptora.
        </p>
      </div>
    </div>
  );
}

export default Corrupcao;
