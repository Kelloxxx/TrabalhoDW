import { sprintLabel } from '../utils/dataHelpers';
import { CampoNota, CampoSimNao, CampoObs } from './shared/CampoFormulario';

function ProductOwner({ dados, updateDados }) {
  const rows = dados.po;
  return (
    <div className="panel">
      <h2>Product Owner</h2>
      <div className="desc">Um Product Owner por time (2 times por empresa).</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th><th>Empresa</th><th>Time</th>
            <th>Requisitos<br />claros ao time?</th>
            <th>Acompanhou os<br />testes de perto?</th>
            <th>Reunião de<br />priorização ocorreu?</th>
            <th>Nota (1-5)</th><th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintLabel(rows, i)}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td><CampoSimNao value={r.requisitos} onChange={(v) => updateDados(`po.${i}.requisitos`, v)} /></td>
              <td><CampoSimNao value={r.testes} onChange={(v) => updateDados(`po.${i}.testes`, v)} /></td>
              <td><CampoSimNao value={r.reuniao} onChange={(v) => updateDados(`po.${i}.reuniao`, v)} /></td>
              <td><CampoNota value={r.nota} onChange={(v) => updateDados(`po.${i}.nota`, v)} /></td>
              <td><CampoObs value={r.obs} onChange={(v) => updateDados(`po.${i}.obs`, v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-teal">
        Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da produção — não pela qualidade técnica do avião em si.
      </div>
    </div>
  );
}

export default ProductOwner;
