import * as XLSX from 'xlsx';

export function readNamesFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = new Uint8Array(ev.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const names = [];
        workbook.SheetNames.forEach(sheetName => {
          const ws = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          rows.forEach(row => {
            row.forEach(cell => {
              if (typeof cell === 'string' && cell.trim().split(' ').length >= 2 && cell.trim().length > 5 && !/\d/.test(cell)) {
                names.push(cell.trim());
              }
            });
          });
        });
        const unique = Array.from(new Set(names));
        if (unique.length === 0) {
          reject('Nenhum nome reconhecível encontrado no arquivo.');
        } else {
          resolve(unique);
        }
      } catch (err) {
        reject('Erro ao ler o arquivo Excel: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
