// src/components/CorrupSabotagem.jsx
import { BUYERS, TIMES } from '../utils/constants';
import { computeCorrupcaoPontos, computeSabotagemPontos } from '../utils/dataHelpers';

export default function CorrupSabotagem({ dados, updateDados }) {
  const c = dados.corrupcao;
  const s = dados.sabotagem;
  const empresas = [dados.meta.empresaA, dados.meta.empresaB];

  const cPts = computeCorrupcaoPontos(c);
  const sPts = computeSabotagemPontos(s);

  const handleCorrupcaoChange = (field, value) => {
    updateDados(`corrupcao.${field}`, value);
  };

  const handleSabotagemChange = (field, value) => {
    updateDados(`sabotagem.${field}`, value);
  };

  return (
    <div className="panel">
      <h2>Corrupção & Sabotagem</h2>
      <div className="desc">
        Estes dois mecanismos são baseados em regras fixas — os pontos abaixo são calculados automaticamente.
      </div>

      <div className="grid2">
        {/* Corrupção */}
        <div className="mini-card">
          <h3>🔒 Corruptor (Owner)</h3>
          <div className="mini-row">
            <label>Empresa do corruptor</label>
            <select
              value={c.empresaCorruptora}
              onChange={(e) => handleCorrupcaoChange('empresaCorruptora', e.target.value)}
            >
              {empresas.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="checkbox-row" style={{ marginBottom: '0.6rem' }}>
            <input
              type="checkbox"
              id="cd1"
              checked={c.primeiraDescoberta}
              onChange={(e) => handleCorrupcaoChange('primeiraDescoberta', e.target.checked)}
            />
            <label htmlFor="cd1">1ª descoberta ocorreu</label>
          </div>
          {c.primeiraDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (1ª vez)</label>
              <select
                value={c.primeiroComprador}
                onChange={(e) => handleCorrupcaoChange('primeiroComprador', e.target.value)}
              >
                <option value="">—</option>
                {BUYERS.filter(b => b !== 'Militar').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}
          <div className="checkbox-row" style={{ marginBottom: '0.6rem' }}>
            <input
              type="checkbox"
              id="cd2"
              checked={c.segundaDescoberta}
              onChange={(e) => handleCorrupcaoChange('segundaDescoberta', e.target.checked)}
              disabled={!c.primeiraDescoberta}
            />
            <label htmlFor="cd2">2ª descoberta ocorreu (mesmo assim)</label>
          </div>
          {c.segundaDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (2ª vez)</label>
              <select
                value={c.segundoComprador}
                onChange={(e) => handleCorrupcaoChange('segundoComprador', e.target.value)}
              >
                <option value="">—</option>
                {BUYERS.filter(b => b !== 'Militar').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mini-row" style={{ borderTop: '1px solid var(--line)', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
            <label><strong>Pontos do corruptor</strong></label>
            <span className={`pts ${cPts.corruptor < 0 ? 'neg' : ''}`}>{cPts.corruptor.toFixed(1)}</span>
          </div>
          {Object.keys(cPts.compradores).map(b => (
            <div className="mini-row" key={b}>
              <label>Pontos — {b}</label>
              <span className={`pts ${cPts.compradores[b] < 0 ? 'neg' : ''}`}>{cPts.compradores[b].toFixed(1)}</span>
            </div>
          ))}
          <div className="note note-red" style={{ marginTop: '0.8rem' }}>
            O corruptor nunca troca de papel e continua negociando normalmente, mesmo após ser descoberto.
          </div>
        </div>

        {/* Sabotagem */}
        <div className="mini-card">
          <h3>🔒 Sabotador (Developer)</h3>
          <div className="mini-row">
            <label>Empresa do sabotador</label>
            <select
              value={s.empresaSabotador}
              onChange={(e) => handleSabotagemChange('empresaSabotador', e.target.value)}
            >
              {empresas.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="mini-row">
            <label>Time do sabotador</label>
            <select
              value={s.timeSabotador}
              onChange={(e) => handleSabotagemChange('timeSabotador', e.target.value)}
            >
              {TIMES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="mini-row">
            <label>Tipo de ação</label>
            <select
              value={s.tipoAcao}
              onChange={(e) => handleSabotagemChange('tipoAcao', e.target.value)}
            >
              <option value="vazar">Vazar informação</option>
              <option value="atrapalhar">Atrapalhar decisões/produção</option>
            </select>
          </div>
          <div className="checkbox-row" style={{ marginBottom: '0.6rem' }}>
            <input
              type="checkbox"
              id="sd1"
              checked={s.descoberto}
              onChange={(e) => handleSabotagemChange('descoberto', e.target.checked)}
            />
            <label htmlFor="sd1">Sabotador foi descoberto</label>
          </div>
          {s.descoberto && (
            <>
              <div className="mini-row">
                <label>Denúncias consecutivas recebidas</label>
                <select
                  value={s.denunciasConsecutivas}
                  onChange={(e) => handleSabotagemChange('denunciasConsecutivas', parseInt(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="checkbox-row" style={{ marginBottom: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="sd2"
                  checked={s.areaSoubeECalou}
                  onChange={(e) => handleSabotagemChange('areaSoubeECalou', e.target.checked)}
                />
                <label htmlFor="sd2">PO/colegas da área sabiam e ficaram calados</label>
              </div>
            </>
          )}
          <div className="mini-row" style={{ borderTop: '1px solid var(--line)', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
            <label><strong>Pontos do sabotador</strong></label>
            <span className={`pts ${sPts.sabotador < 0 ? 'neg' : ''}`}>{sPts.sabotador.toFixed(1)}</span>
          </div>
          <div className="mini-row">
            <label><strong>Pontos da área/time</strong></label>
            <span className={`pts ${sPts.area < 0 ? 'neg' : sPts.area > 0 ? 'pos' : ''}`}>
              {sPts.area > 0 ? '+' : ''}{sPts.area.toFixed(1)}
            </span>
          </div>
          <div className="mini-row">
            <label><strong>Demitido?</strong></label>
            <span className="pts">{sPts.demitido ? 'SIM — vai para o time RIVAL' : 'Não'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}