import { SPRINTS, TIMES, BUYERS, SEED_NAMES } from './constants';

export function buildInitialData(empresaA, empresaB) {
  const empresas = [empresaA, empresaB];
  const sm = [], owner = [];
  SPRINTS.forEach(sp => empresas.forEach(emp => {
    sm.push({ sprint: sp, empresa: emp, conduziu: "", removeu: "", ajudou: "", nota: "", obs: "" });
    owner.push({ sprint: sp, empresa: emp, comunicacao: "", negociacao: "", alinhamento: "", notaGeral: "", obs: "" });
  }));

  const po = [], dev = [];
  SPRINTS.forEach(sp => empresas.forEach(emp => TIMES.forEach(t => {
    po.push({ sprint: sp, empresa: emp, time: t, requisitos: "", testes: "", reuniao: "", nota: "", obs: "" });
    dev.push({ sprint: sp, empresa: emp, time: t, qualidade: "", processo: "", colaboracao: "", notaTime: "", destaque: "" });
  })));

  const buyerProf = [];
  SPRINTS.forEach(sp => BUYERS.forEach(b => {
    buyerProf.push({ sprint: sp, comprador: b, checklist: "", decisoes: "", feedback: "", nota: "", obs: "" });
  }));

  const buyerProduct = [];
  SPRINTS.forEach(sp => {
    empresas.forEach(emp => {
      buyerProduct.push({ sprint: sp, comprador: "Governo", empresa: emp, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Governo", empresa: emp, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Militar", empresa: emp, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Setor Privado", empresa: emp, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
    });
  });

  const corrupcao = { empresaCorruptora: empresaA, primeiraDescoberta: false, primeiroComprador: "", segundaDescoberta: false, segundoComprador: "" };
  const sabotagem = { empresaSabotador: empresaA, timeSabotador: "Caça", tipoAcao: "atrapalhar", denunciasConsecutivas: 0, descoberto: false, areaSoubeECalou: false };
  const weights = { sm: 1, owner: 1, po: 1, dev: 2, buyer: 2 };
  const teamNames = {
    [empresaA]: { Caça: "Esquadrão Falcon", Transporte: "Falcon Carggo" },
    [empresaB]: { Caça: "SkyForge Combat", Transporte: "SkyForge Transport" },
  };
  const alunos = SEED_NAMES.map((nome, i) => ({ id: i + 1, nome, empresa: "", time: "", papel: "" }));

  return {
    meta: { turma: "", data: "", empresaA, empresaB, fontScale: 16 },
    sm, owner, po, dev, buyerProf, buyerProduct, corrupcao, sabotagem, weights, teamNames, alunos,
  };
}

export function avg(arr) {
  const nums = arr.map(v => parseFloat(v)).filter(v => !isNaN(v));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function computeCorrupcaoPontos(c) {
  let corruptor = 0;
  const compradores = {};
  if (c.primeiraDescoberta) {
    corruptor -= 1;
    if (c.primeiroComprador) compradores[c.primeiroComprador] = (compradores[c.primeiroComprador] || 0) - 1;
  }
  if (c.segundaDescoberta) {
    corruptor -= 1;
    if (c.segundoComprador) compradores[c.segundoComprador] = (compradores[c.segundoComprador] || 0) - 1;
  }
  return { corruptor, compradores };
}

export function computeSabotagemPontos(s) {
  let sabotador = 0, area = 0, demitido = false;
  if (s.descoberto) {
    sabotador -= 1;
    area += s.areaSoubeECalou ? -1 : 1;
    if (s.tipoAcao === "vazar" && s.denunciasConsecutivas >= 1) demitido = true;
    if (s.tipoAcao === "atrapalhar" && s.denunciasConsecutivas >= 2) demitido = true;
  }
  return { sabotador, area, demitido };
}

export function computeEmpresaScore(data, empresa) {
  const w = data.weights;
  const smAvg = avg(data.sm.filter(r => r.empresa === empresa).map(r => r.nota));
  const ownerAvg = avg(data.owner.filter(r => r.empresa === empresa).map(r => r.notaGeral));
  const poAvg = avg(data.po.filter(r => r.empresa === empresa).map(r => r.nota));
  const devAvg = avg(data.dev.filter(r => r.empresa === empresa).map(r => r.notaTime));
  const buyerAvg = avg(data.buyerProduct.filter(r => r.empresa === empresa).map(r => r.nota));
  const parts = [
    { key: "Scrum Master", val: smAvg, w: w.sm },
    { key: "Owner", val: ownerAvg, w: w.owner },
    { key: "Product Owner", val: poAvg, w: w.po },
    { key: "Developers", val: devAvg, w: w.dev },
    { key: "Avaliação dos Compradores", val: buyerAvg, w: w.buyer },
  ];
  let sumW = 0, sumV = 0;
  parts.forEach(p => { if (p.val !== null) { sumW += p.w; sumV += p.val * p.w; } });
  const base = sumW > 0 ? sumV / sumW : null;
  let ajuste = 0;
  const cPts = computeCorrupcaoPontos(data.corrupcao);
  const sPts = computeSabotagemPontos(data.sabotagem);
  if (data.corrupcao.empresaCorruptora === empresa) ajuste += cPts.corruptor;
  if (data.sabotagem.empresaSabotador === empresa) ajuste += sPts.sabotador + sPts.area;
  return { base, ajuste, final: base !== null ? base + ajuste : null, parts };
}
export function setByPath(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}
