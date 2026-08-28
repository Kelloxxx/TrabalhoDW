import { useState, useEffect } from 'react';

export function useStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });


  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  const salvarManual = () => {
    localStorage.setItem(key, JSON.stringify(data));
    alert('✅ Dados salvos com sucesso!');
  };

  const baixarJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTurma = (data.meta?.turma || 'simulacao').replace(/[^a-z0-9A-Z_-]+/g, '_');
    a.download = `scrum_simulacao_${safeTurma}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const carregarJSON = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          resolve(parsed);
        } catch {
          reject('Arquivo inválido');
        }
      };
      reader.readAsText(file);
    });
  };

  return [data, setData, salvarManual, baixarJSON, carregarJSON];
}