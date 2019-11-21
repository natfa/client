/**
 * Transforms a Buffer type to a Blob object
 * @param {object} buffer - A buffer object that contains a type and data properties
 * @returns {{ url: string, file: Blob }} An object containing the blob and a url to represent it
 */
const bufferToBlob = (buffer) => {
  if (buffer.type !== 'Buffer') {
    throw new Error('This method isn\'t implemented for types different than \'Buffer\'');
  }

  const uintarray = new Uint8Array(buffer.data);
  const file = new Blob([uintarray], { type: 'image/*' });
  const url = window.URL.createObjectURL(file);

  return { url, file };
};

export default bufferToBlob;
