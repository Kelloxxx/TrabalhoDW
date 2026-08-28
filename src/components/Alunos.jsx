import { useState } from 'react';
import { PAPEIS, TIMES, ROLE_COLORS } from '../utils/constants';
import { readNamesFromExcel } from '../utils/excelHelper';

export default function Alunos({ dados, updateDados }) {
  const [search, setSearch] = useState('');
  const [importing, setImporting] = useState(false);

  const { alunos, meta, teamNames } = dados;
  const empresas = [meta.empresaA, meta.empresaB];

  // Contagem de vagas
  const counts = {};
  empresas.forEach(e => {
    counts[e] = {
      "Scrum Master": 0,
      "Owner/Stakeholder": 0,
      "Product Owner-Caça": 0,
      "Product Owner-Transporte": 0,
      "Developer-Caça": 0,
      "Developer-Transporte": 0
    };
  });
  const buyerCounts = {
    "Comprador - Governo": 0,
    "Comprador - Militar": 0,
    "Comprador - Setor Privado": 0
  };

  alunos.forEach(a => {
    if (a.papel === "Comprador - Governo" || a.papel === "Comprador - Militar" || a.papel === "Comprador - Setor Privado") {
      buyerCounts[a.papel]++;
    } else if (a.papel === "Scrum Master" || a.papel === "Owner/Stakeholder") {
      if (counts[a.empresa]) counts[a.empresa][a.papel]++;
    } else if (a.papel === "Product Owner" || a.papel === "Developer") {
      if (counts[a.empresa] && a.time) {
        counts[a.empresa][a.papel + "-" + a.time]++;
      }
    }
  });

  const naoAtribuidos = alunos.filter(a => !a.papel).length;

  const updateAluno = (index, field, value) => {
    updateDados(`alunos.${index}.${field}`, value);
  };

  const filteredAlunos = alunos.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    try {
      const names = await readNamesFromExcel(file);
      if (!window.confirm(`Encontrei ${names.length} nomes. Isso substitui a lista atual de alunos (as atribuições feitas serão perdidas). Continuar?`)) {
        setImporting(false);
        return;
      }
      const novosAlunos = names.map((nome, i) => ({
        id: i + 1,
        nome,
        empresa: "",
        time: "",
        papel: ""
      }));
      updateDados('alunos', novosAlunos);
      alert(`✅ ${names.length} alunos importados com sucesso!`);
    } catch (err) {
      alert('❌ ' + err);
    }
    setImporting(false);
    e.target.value = '';
  };

  return (
    <div className="panel">
      <h2>Alunos</h2>
      <div className="desc">
        Atribua cada aluno a um papel e equipe. A turma não escolhe o lado — a atribuição é feita aqui pelo professor.
      </div>

      <div className="roster-search">
        <input
          type="text"
          placeholder="Buscar aluno por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="roster-table">
        <thead>
          <tr>
            <th style={{ width: '2.5rem' }}>#</th>
            <th style={{ width: '16rem' }}>Nome</th>
            <th>Papel</th>
            <th>Empresa</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((a) => {
            const originalIndex = alunos.indexOf(a);
            const needsEmpresa = a.papel === "Scrum Master" || a.papel === "Owner/Stakeholder" || a.papel === "Product Owner" || a.papel === "Developer";
            const needsTime = a.papel === "Product Owner" || a.papel === "Developer";
            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td style={{ textAlign: 'left' }}>{a.nome}</td>
                <td>
                  <select
                    value={a.papel}
                    onChange={(e) => updateAluno(originalIndex, 'papel', e.target.value)}
                  >
                    {PAPEIS.map(p => (
                      <option key={p} value={p}>
                        {p === "" ? "— não atribuído —" : p}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {needsEmpresa ? (
                    <select
                      value={a.empresa}
                      onChange={(e) => updateAluno(originalIndex, 'empresa', e.target.value)}
                    >
                      <option value="">—</option>
                      {empresas.map(e => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  ) : ''}
                </td>
                <td>
                  {needsTime ? (
                    <select
                      value={a.time || ''}
                      onChange={(e) => updateAluno(originalIndex, 'time', e.target.value)}
                    >
                      <option value="">—</option>
                      {TIMES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  ) : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={`note ${naoAtribuidos > 0 ? 'note-orange' : 'note-green'}`} style={{ marginTop: '1rem' }}>
        {naoAtribuidos} de {alunos.length} alunos ainda sem papel atribuído.
      </div>

      <h2 style={{ marginTop: '1.6rem' }}>Resumo de Vagas Preenchidas</h2>
      <div className="grid2">
        {empresas.map(e => (
          <div className="mini-card" key={e}>
            <h3>{e}</h3>
            <div className="mini-row"><label>Scrum Master</label><span className="pts">{counts[e]["Scrum Master"]} / 1</span></div>
            <div className="mini-row"><label>Owner/Stakeholder</label><span className="pts">{counts[e]["Owner/Stakeholder"]} / 1</span></div>
            <div className="mini-row"><label>PO — {teamNames[e]?.Caça || 'Caça'}</label><span className="pts">{counts[e]["Product Owner-Caça"]} / 1</span></div>
            <div className="mini-row"><label>PO — {teamNames[e]?.Transporte || 'Transporte'}</label><span className="pts">{counts[e]["Product Owner-Transporte"]} / 1</span></div>
            <div className="mini-row"><label>Devs — {teamNames[e]?.Caça || 'Caça'}</label><span className="pts">{counts[e]["Developer-Caça"]} / 4</span></div>
            <div className="mini-row"><label>Devs — {teamNames[e]?.Transporte || 'Transporte'}</label><span className="pts">{counts[e]["Developer-Transporte"]} / 5</span></div>
          </div>
        ))}
      </div>

      <div className="mini-card" style={{ marginTop: '1rem' }}>
        <h3>Compradores</h3>
        <div className="mini-row"><label>Governo</label><span className="pts">{buyerCounts["Comprador - Governo"]} / 1</span></div>
        <div className="mini-row"><label>Militar</label><span className="pts">{buyerCounts["Comprador - Militar"]} / 1</span></div>
        <div className="mini-row"><label>Setor Privado</label><span className="pts">{buyerCounts["Comprador - Setor Privado"]} / 1</span></div>
      </div>

      <h2 style={{ marginTop: '1.6rem' }}>Importar Lista de Alunos</h2>
      <div className="desc">
        Substitui a lista atual por uma nova, a partir de um arquivo Excel (.xlsx). Use apenas se for reaproveitar este painel para outra turma.
      </div>
      <input
        type="file"
        id="importAlunosFile"
        accept=".xlsx,.xls"
        onChange={handleImportExcel}
        disabled={importing}
      />
      {importing && <span style={{ marginLeft: '0.5rem' }}>Lendo arquivo...</span>}
    </div>
  );
}
