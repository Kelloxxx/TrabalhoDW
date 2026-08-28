import { useFontSize } from '../hooks/useFontSize';

export default function TopBar({ fileName, onLoad, onSave, onReset }) {
  const { fontSize, increase, decrease, reset } = useFontSize();

  const handleLoadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onLoad(e.target.files[0]);
    }
    e.target.value = '';
  };

  return (
    <div className="topbar">
      <div>
        <h1>Painel de Avaliação — Simulação Scrum Competitiva</h1>
        <div className="sub">{fileName || '(nenhum arquivo carregado)'}</div>
      </div>
      <div className="topbar-actions">
        <div className="fontctrl">
          <span className="lbl">Fonte</span>
          <button onClick={decrease} title="Diminuir fonte">A−</button>
          <button onClick={reset} title="Restaurar fonte padrão">A</button>
          <button onClick={increase} title="Aumentar fonte">A+</button>
          <span className="lbl">{fontSize}px</span>
        </div>
        <input
          type="file"
          id="fileInput"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="btn btn-load" onClick={handleLoadClick}>
           Carregar dados (.json)
        </button>
        <button className="btn btn-save" onClick={onSave}>
           Salvar dados (.json)
        </button>
        <button className="btn btn-reset" onClick={onReset}>
          Limpar tudo
        </button>
      </div>
    </div>
  );
}
