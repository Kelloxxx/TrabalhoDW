import { useState } from 'react';
import { useStorage } from './hooks/useStorage';
import { buildInitialData } from './utils/dataHelpers';
import { setByPath } from './utils/dataHelpers';
import TopBar from './components/TopBar';
import Tabs from './components/Tabs';
import Configuracao from './components/Configuracao';
import Alunos from './components/Alunos';
// Os componentes abaixo serão implementados pelos outros membros
// import Escalacao from './components/Escalacao';
import ScrumMaster from './components/ScrumMaster';
import Owner from './components/Owner';
import ProductOwner from './components/ProductOwner';
import Developers from './components/Developers';
// import BuyerProf from './components/BuyerProf';
// import BuyerProduct from './components/BuyerProduct';
// import CorrupSabotagem from './components/CorrupSabotagem';
// import Resultado from './components/Resultado';

// Placeholders para evitar erro enquanto não implementados
const Escalacao = () => <div className="panel"><h2>Escalação</h2><p>Em breve</p></div>;
const BuyerProf = () => <div className="panel"><h2>Compradores (Papel)</h2><p>Em breve</p></div>;
const BuyerProduct = () => <div className="panel"><h2>Compradores (Produto)</h2><p>Em breve</p></div>;
const CorrupSabotagem = () => <div className="panel"><h2>Corrupção & Sabotagem</h2><p>Em breve</p></div>;
const Resultado = () => <div className="panel"><h2>Resultado Final</h2><p>Em breve</p></div>;

const TABS = [
  { key: 'configuracao', label: 'Configuração', component: Configuracao },
  { key: 'alunos', label: 'Alunos', component: Alunos },
  { key: 'escalacao', label: 'Escalação', component: Escalacao },
  { key: 'sm', label: 'Scrum Master', component: ScrumMaster },
  { key: 'owner', label: 'Owner', component: Owner },
  { key: 'po', label: 'Product Owner', component: ProductOwner },
  { key: 'dev', label: 'Developers', component: Developers },
  { key: 'buyerProf', label: 'Compradores (Papel)', component: BuyerProf },
  { key: 'buyerProduct', label: 'Compradores (Produto)', component: BuyerProduct },
  { key: 'corrupsab', label: 'Corrupção & Sabotagem', component: CorrupSabotagem },
  { key: 'result', label: 'Resultado Final', component: Resultado },
];

function App() {
  const [dados, setDados, salvarManual, baixarJSON, carregarJSON] = useStorage(
    'scrumData',
    buildInitialData('Maverick Aviation', 'SkyForge Ind. Aeronáutica')
  );
  const [activeTab, setActiveTab] = useState('configuracao');
  const [fileName, setFileName] = useState('(nenhum arquivo carregado)');

  const handleLoadFile = async (file) => {
    try {
      const parsed = await carregarJSON(file);
      // Garantir que campos essenciais existam
      if (!parsed.alunos) parsed.alunos = [];
      if (!parsed.teamNames) {
        parsed.teamNames = {
          [parsed.meta.empresaA]: { Caça: 'Esquadrão Falcon', Transporte: 'Falcon Carggo' },
          [parsed.meta.empresaB]: { Caça: 'SkyForge Combat', Transporte: 'SkyForge Transport' }
        };
      }
      setDados(parsed);
      setFileName(file.name);
      alert(' Dados carregados com sucesso!');
    } catch (err) {
      alert('Não foi possível ler este arquivo. Verifique se é um .json válido.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Isso apaga todos os dados lançados nesta sessão. Continuar?')) {
      setDados(buildInitialData('Maverick Aviation', 'SkyForge Ind. Aeronáutica'));
      setFileName('(nenhum arquivo carregado)');
    }
  };

  const updateDados = (path, value) => {
    setDados(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // clone profundo
      setByPath(newData, path, value);
      return newData;
    });
  };

  const ActiveComponent = TABS.find(t => t.key === activeTab)?.component;

  return (
    <div className="app">
      <TopBar
        fileName={fileName}
        onLoad={handleLoadFile}
        onSave={() => { salvarManual(); baixarJSON(); }}
        onReset={handleReset}
      />
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="wrap">
        {ActiveComponent && (
          <ActiveComponent dados={dados} updateDados={updateDados} />
        )}
        <div className="footer-note">
          Os dados ficam apenas nesta janela até você clicar em "Salvar dados (.json)".
          Salve com frequência, especialmente ao final de cada Sprint.
        </div>
      </div>
    </div>
  );
}

export default App;
