import { sprintLabel } from '../utils/dataHelpers';
import { CampoNota, CampoObs } from './shared/CampoFormulario';

function Owner({ dados, updateDados }) {
  const rows = dados.owner;
  return (
    <div className="panel">
      <h2>Stakeholder / Owner</h2>
      <div className="desc">
        Avaliação de comunicação e negociação — independente dos pontos de corrupção, registrados na aba "Corrupção &amp; Sabotagem".
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th><th>Empresa</th>
            <th>Comunicação com<br />a equipe (1-5)</th>
            <th>Negociação com<br />compradores (1-5)</th>
            <th>Alinhamento com<br />SM/PO sobre qualidade (1-5)</th>
            <th>Nota Geral (1-5)</th><th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td><CampoNota value={r.comunicacao} onChange={(v) => updateDados(`owner.${i}.comunicacao`, v)} /></td>
              <td><CampoNota value={r.negociacao} onChange={(v) => updateDados(`owner.${i}.negociacao`, v)} /></td>
              <td><CampoNota value={r.alinhamento} onChange={(v) => updateDados(`owner.${i}.alinhamento`, v)} /></td>
              <td><CampoNota value={r.notaGeral} onChange={(v) => updateDados(`owner.${i}.notaGeral`, v)} /></td>
              <td><CampoObs value={r.obs} onChange={(v) => updateDados(`owner.${i}.obs`, v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-blue">
        Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no mecanismo de corrupção, calculados automaticamente na aba própria.
      </div>
    </div>
  );
}

export default Owner;
