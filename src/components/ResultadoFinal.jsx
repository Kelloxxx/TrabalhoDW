import React from 'react';
import { computeEmpresaScore } from '../utils/dataHelpers';

function ResultadoFinal({ dados }) {
  const empresaA = dados.meta?.empresaA;
  const empresaB = dados.meta?.empresaB;

  const scoreA = empresaA
    ? computeEmpresaScore(dados, empresaA)
    : null;

  const scoreB = empresaB
    ? computeEmpresaScore(dados, empresaB)
    : null;

  const formatarNota = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '—';
    }

    return Number(valor).toFixed(2);
  };

  let vencedora = null;

  if (scoreA?.final !== null && scoreB?.final !== null) {
    if (scoreA.final > scoreB.final) {
      vencedora = empresaA;
    } else if (scoreB.final > scoreA.final) {
      vencedora = empresaB;
    } else {
      vencedora = 'Empate';
    }
  }

  const renderEmpresa = (empresa, score) => {
    if (!empresa || !score) return null;

    return (
      <div className="result-card">

        <h3>{empresa}</h3>

        <div className="final-score">
          <span>Nota final</span>
          <strong>{formatarNota(score.final)}</strong>
        </div>

        <div className="score-details">

          {score.parts.map((parte) => (
            <div className="score-row" key={parte.key}>
              <span>
                {parte.key}
                {parte.w > 1 && ` (peso ${parte.w})`}
              </span>

              <strong>
                {formatarNota(parte.val)}
              </strong>
            </div>
          ))}

        </div>

        <div className="score-row adjustment">
          <span>Ajustes de Corrupção/Sabotagem</span>

          <strong>
            {score.ajuste > 0 ? '+' : ''}
            {formatarNota(score.ajuste)}
          </strong>
        </div>

        <div className="score-row total">
          <span>Resultado final</span>

          <strong>
            {formatarNota(score.final)}
          </strong>
        </div>

      </div>
    );
  };

  return (
    <div className="panel">

      <h2>Resultado Final</h2>

      <p>
        Confira abaixo o resultado geral das duas empresas após as avaliações
        realizadas durante os Sprints.
      </p>

      <div className="results-grid">
        {renderEmpresa(empresaA, scoreA)}
        {renderEmpresa(empresaB, scoreB)}
      </div>

      <div className="winner-box">

        <h3>Resultado da avaliação</h3>

        {vencedora === null && (
          <p>
            Ainda não existem dados suficientes para determinar a vencedora.
          </p>
        )}

        {vencedora === 'Empate' && (
          <p>
            <strong>Empate!</strong> As duas empresas possuem a mesma nota
            final.
          </p>
        )}

        {vencedora && vencedora !== 'Empate' && (
          <>
            <p>
              A empresa vencedora é:
            </p>

            <strong className="winner-name">
              {vencedora}
            </strong>
          </>
        )}

      </div>

      <div className="rules-box">

        <h3>Pesos utilizados</h3>

        <ul>
          <li>Scrum Master: peso 1</li>
          <li>Owner: peso 1</li>
          <li>Product Owner: peso 1</li>
          <li>Developers: peso 2</li>
          <li>Avaliação dos Compradores: peso 2</li>
        </ul>

        <p>
          A nota final é calculada a partir da média ponderada das avaliações
          disponíveis, somada aos ajustes de corrupção e sabotagem.
        </p>

      </div>

    </div>
  );
}

export default ResultadoFinal;
