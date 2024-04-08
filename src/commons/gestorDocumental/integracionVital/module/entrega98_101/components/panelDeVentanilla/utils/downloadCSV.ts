/* eslint-disable @typescript-eslint/naming-convention */
export const downloadCSV = (data: any, filename: any) => {
  console.log('soy la fucking data', data)
  let csvContent = '\uFEFF'; // BOM for UTF-8
  const keys = Object.keys(data);
  csvContent += keys.join(';') + '\n';

  const row = keys.map(key => `"${data[key] === null ? 'N/A' : data[key]}"`).join(';');
  csvContent += row + '\n';

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}