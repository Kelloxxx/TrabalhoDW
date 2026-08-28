import React from 'react';
import { ROLE_COLORS, TEAM_IMAGES } from '../utils/constants';

const Escalacao = ({ dados }) => {
  const { alunos, meta, teamNames } = dados;
  const empresas = [meta.empresaA, meta.empresaB];

  // Agrupa alunos por empresa e time
  const grouped = {};
  empresas.forEach(emp => {
    grouped[emp] = {};
    ['Caça', 'Transporte'].forEach(time => {
      grouped[emp][time] = alunos.filter(a => a.empresa === emp && a.time === time);
    });
    // Alunos sem time (Scrum Master, Owner, Compradores, etc.)
    grouped[emp]['Sem time'] = alunos.filter(a => a.empresa === emp && !a.time);
  });

  // Contagem de vagas (igual ao Alunos, apenas para exibição)
  const counts = {};
  empresas.forEach(e => {
    counts[e] = {
      "Scrum Master": 0,
      "Owner/Stakeholder": 0,
      "Product Owner-Caça": 0,
      "Product Owner-Transporte": 0,
      "Developer-Caça": 0,
      "Developer-Transporte": 0,
    };
  });
  const buyerCounts = {
    "Comprador - Governo": 0,
    "Comprador - Militar": 0,
    "Comprador - Setor Privado": 0,
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

  return (
    <div className="panel">
      <h2>Escalação</h2>
      <div className="desc">
        Visualização das equipes formadas para cada empresa. As atribuições são feitas na aba <strong>Alunos</strong>.
      </div>

      <div className="grid2">
        {empresas.map(emp => (
          <div className="mini-card" key={emp}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {emp}
              <img
                src={TEAM_IMAGES[emp]?.logo || ''}
                alt={emp}
                style={{ height: '40px', marginLeft: '0.5rem', verticalAlign: 'middle' }}
              />
            </h3>
            {['Caça', 'Transporte', 'Sem time'].map(time => {
              const alunosDoTime = grouped[emp][time] || [];
              if (alunosDoTime.length === 0 && time !== 'Sem time') return null;
              const timeLabel = time === 'Sem time' ? 'Sem time definido' : (teamNames[emp]?.[time] || time);
              return (
                <div key={time} style={{ marginBottom: '1rem' }}>
                  <strong>{timeLabel}</strong>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '0.3rem' }}>
                    {alunosDoTime.map(aluno => (
                      <li
                        key={aluno.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.2rem 0',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <span>{aluno.nome}</span>
                        <span
                          style={{
                            backgroundColor: ROLE_COLORS[aluno.papel] || '#ccc',
                            color: '#fff',
                            padding: '0 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {aluno.papel || '—'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Escalacao;