import { sprintLabel } from '../utils/dataHelpers';
import { CampoNota, CampoSimNao, CampoObs } from './shared/CampoFormulario';

function ScrumMaster({ dados, updateDados }) {
  const rows = dados.sm;
  return (
    <div className="panel">
      <h2>Scrum Master</h2>
      <div className="desc">Avaliação de processo — um Scrum Master por empresa, atendendo os dois times.</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th><th>Empresa</th>
            <th>Conduziu os eventos<br />corretamente?</th>
            <th>Removeu<br />impedimentos?</th>
            <th>Ajudou o time a<br />melhorar entre Sprints?</th>
            <th>Nota (1-5)</th><th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td><CampoSimNao value={r.conduziu} onChange={(v) => updateDados(`sm.${i}.conduziu`, v)} /></td>
              <td><CampoSimNao value={r.removeu} onChange={(v) => updateDados(`sm.${i}.removeu`, v)} /></td>
              <td><CampoSimNao value={r.ajudou} onChange={(v) => updateDados(`sm.${i}.ajudou`, v)} /></td>
              <td><CampoNota value={r.nota} onChange={(v) => updateDados(`sm.${i}.nota`, v)} /></td>
              <td><CampoObs value={r.obs} onChange={(v) => updateDados(`sm.${i}.obs`, v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-dark">
        Critério-guia: o SM não é avaliado por produzir, mas por garantir que o Scrum aconteça de verdade e por ajudar o time a evoluir de uma Sprint para a outra.
      </div>
    </div>
  );
}

export default ScrumMaster;
