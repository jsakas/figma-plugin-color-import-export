export function download(text, name, type) {
  const a = document.createElement('a');
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;

  a.click();
}
