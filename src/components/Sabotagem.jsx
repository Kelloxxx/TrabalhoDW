import React from 'react';

function Sabotagem({ dados, updateDados }) {
  const sabotagem = dados.sabotagem || {};

  const empresas = [
    dados.meta?.empresaA,
    dados.meta?.empresaB
  ].filter(Boolean);

  const times = ['Caça', 'Transporte'];

  return (
    <div className="panel">
      <h2>Sabotagem</h2>

      <p>
        Registre aqui os acontecimentos relacionados à sabotagem durante a
        avaliação.
      </p>

      <div className="form-grid">

        <div className="form-group">
          <label>Empresa sabotadora</label>

          <select
            value={sabotagem.empresaSabotador || ''}
            onChange={(e) =>
              updateDados(
                'sabotagem.empresaSabotador',
                e.target.value
              )
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
          <label>Time sabotador</label>

          <select
            value={sabotagem.timeSabotador || ''}
            onChange={(e) =>
              updateDados(
                'sabotagem.timeSabotador',
                e.target.value
              )
            }
          >
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de ação</label>

          <select
            value={sabotagem.tipoAcao || ''}
            onChange={(e) =>
              updateDados(
                'sabotagem.tipoAcao',
                e.target.value
              )
            }
          >
            <option value="atrapalhar">Atrapalhar</option>
            <option value="vazar">Vazar informações</option>
          </select>
        </div>

        <div className="form-group">
          <label>Denúncias consecutivas</label>

          <input
            type="number"
            min="0"
            value={sabotagem.denunciasConsecutivas ?? 0}
            onChange={(e) =>
              updateDados(
                'sabotagem.denunciasConsecutivas',
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="form-group">
          <label>A sabotagem foi descoberta?</label>

          <select
            value={sabotagem.descoberto ? 'sim' : 'nao'}
            onChange={(e) =>
              updateDados(
                'sabotagem.descoberto',
                e.target.value === 'sim'
              )
            }
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        <div className="form-group">
          <label>Área soube e ficou calada?</label>

          <select
            value={sabotagem.areaSoubeECalou ? 'sim' : 'nao'}
            onChange={(e) =>
              updateDados(
                'sabotagem.areaSoubeECalou',
                e.target.value === 'sim'
              )
            }
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

      </div>

      <div className="result-box">
        <h3>Resumo da sabotagem</h3>

        <p>
          <strong>Empresa:</strong>{' '}
          {sabotagem.empresaSabotador || 'Não definida'}
        </p>

        <p>
          <strong>Time:</strong>{' '}
          {sabotagem.timeSabotador || 'Não definido'}
        </p>

        <p>
          <strong>Ação:</strong>{' '}
          {sabotagem.tipoAcao === 'vazar'
            ? 'Vazar informações'
            : 'Atrapalhar'}
        </p>

        <p>
          <strong>Denúncias consecutivas:</strong>{' '}
          {sabotagem.denunciasConsecutivas || 0}
        </p>

        <p>
          <strong>Descoberta:</strong>{' '}
          {sabotagem.descoberto ? 'Sim' : 'Não'}
        </p>

        <p>
          <strong>Área soube e ficou calada:</strong>{' '}
          {sabotagem.areaSoubeECalou ? 'Sim' : 'Não'}
        </p>

        <p className="warning">
          Quando descoberta, a sabotagem gera penalidades conforme as regras
          definidas no sistema.
        </p>
      </div>
    </div>
  );
}

export default Sabotagem;
