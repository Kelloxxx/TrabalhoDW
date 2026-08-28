export default function Configuracao({ dados, updateDados }) {
  const { meta, weights, teamNames } = dados;
  const empresaA = meta.empresaA;
  const empresaB = meta.empresaB;

  const handleChange = (path, value) => {
    updateDados(path, value);
  };

  const renameEmpresa = (which, novoNome) => {
    const oldVal = which === 'nomeA' ? empresaA : empresaB;
    if (!novoNome || novoNome === oldVal) return;

    updateDados(`meta.${which === 'nomeA' ? 'empresaA' : 'empresaB'}`, novoNome);

    const rename = (v) => (v === oldVal ? novoNome : v);
    const renameInArray = (arr, field) => {
      arr.forEach(item => { if (item[field] === oldVal) item[field] = novoNome; });
    };
    renameInArray(dados.sm, 'empresa');
    renameInArray(dados.owner, 'empresa');
    renameInArray(dados.po, 'empresa');
    renameInArray(dados.dev, 'empresa');
    renameInArray(dados.buyerProduct, 'empresa');
    dados.alunos.forEach(a => { if (a.empresa === oldVal) a.empresa = novoNome; });
    if (dados.corrupcao.empresaCorruptora === oldVal) dados.corrupcao.empresaCorruptora = novoNome;
    if (dados.sabotagem.empresaSabotador === oldVal) dados.sabotagem.empresaSabotador = novoNome;
    if (dados.teamNames[oldVal]) {
      dados.teamNames[novoNome] = dados.teamNames[oldVal];
      delete dados.teamNames[oldVal];
    }
    updateDados('meta', { ...dados.meta });
  };

  const updateTeamName = (empresa, time, novoNome) => {
    updateDados(`teamNames.${empresa}.${time}`, novoNome);
  };

  const weightLabels = {
    sm: 'Scrum Master',
    owner: 'Owner',
    po: 'Product Owner',
    dev: 'Developers',
    buyer: 'Avaliação dos Compradores'
  };

  return (
    <div className="panel">
      <h2>Configuração</h2>
      <div className="desc">
        Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input
            type="text"
            value={meta.turma || ''}
            onChange={(e) => handleChange('meta.turma', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Data</label>
          <input
            type="text"
            value={meta.data || ''}
            onChange={(e) => handleChange('meta.data', e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa A</label>
          <input
            type="text"
            id="nomeA"
            value={empresaA}
            onChange={(e) => renameEmpresa('nomeA', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa A</label>
          <input
            type="text"
            value={teamNames[empresaA]?.Caça || ''}
            onChange={(e) => updateTeamName(empresaA, 'Caça', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa A</label>
          <input
            type="text"
            value={teamNames[empresaA]?.Transporte || ''}
            onChange={(e) => updateTeamName(empresaA, 'Transporte', e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa B</label>
          <input
            type="text"
            id="nomeB"
            value={empresaB}
            onChange={(e) => renameEmpresa('nomeB', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa B</label>
          <input
            type="text"
            value={teamNames[empresaB]?.Caça || ''}
            onChange={(e) => updateTeamName(empresaB, 'Caça', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa B</label>
          <input
            type="text"
            value={teamNames[empresaB]?.Transporte || ''}
            onChange={(e) => updateTeamName(empresaB, 'Transporte', e.target.value)}
          />
        </div>
      </div>

      <div className="note note-dark">
        Dica: os nomes de empresa já vêm pré-preenchidos a partir das imagens que você enviou (Maverick Aviation e SkyForge Ind. Aeronáutica). Pode alterar se quiser.
      </div>

      <h2 style={{ marginTop: '1.6rem' }}>Pesos da Nota Final</h2>
      <div className="desc">
        Ajuste o peso de cada papel no cálculo da nota final da empresa (aba "Resultado Final").
      </div>
      <div className="weights-panel">
        {Object.keys(weights).map((k) => (
          <div className="weight-field" key={k}>
            <label>{weightLabels[k]}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={weights[k]}
              onChange={(e) => handleChange(`weights.${k}`, parseFloat(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
