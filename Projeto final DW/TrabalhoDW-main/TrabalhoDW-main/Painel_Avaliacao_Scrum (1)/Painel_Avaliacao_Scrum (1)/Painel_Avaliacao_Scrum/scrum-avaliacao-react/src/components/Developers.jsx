import { sprintLabel } from '../utils/dataHelpers';
import { CampoNota, CampoSimNao, CampoObs } from './shared/CampoFormulario';

function Developers({ dados, updateDados }) {
  const rows = dados.dev;
  return (
    <div className="panel">
      <h2>Developers</h2>
      <div className="desc">
        Avaliação por time — com muitos alunos em produção, a qualidade do produto é o principal indicador de entendimento do processo pelo grupo.
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th><th>Empresa</th><th>Time</th>
            <th>Qualidade do<br />produto (1-5)</th>
            <th>Seguiu o<br />processo?</th>
            <th>Colaboração<br />do time (1-5)</th>
            <th>Nota Time (1-5)</th><th>Destaque individual (opcional)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td><CampoNota value={r.qualidade} onChange={(v) => updateDados(`dev.${i}.qualidade`, v)} /></td>
              <td><CampoSimNao value={r.processo} onChange={(v) => updateDados(`dev.${i}.processo`, v)} /></td>
              <td><CampoNota value={r.colaboracao} onChange={(v) => updateDados(`dev.${i}.colaboracao`, v)} /></td>
              <td><CampoNota value={r.notaTime} onChange={(v) => updateDados(`dev.${i}.notaTime`, v)} /></td>
              <td><CampoObs value={r.destaque} onChange={(v) => updateDados(`dev.${i}.destaque`, v)} placeholder="nome (se houver)" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-green">
        Reserve a coluna de destaque individual apenas para casos que realmente chamem atenção, positiva ou negativamente.
      </div>
    </div>
  );
}

export default Developers;
