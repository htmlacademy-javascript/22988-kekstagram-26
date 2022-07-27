const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserHandler = document.querySelector('.img-upload__input');
const previewPublication = document.querySelector('.img-upload__preview img');

fileChooserHandler.addEventListener('change', () => {
  const file = fileChooserHandler.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPublication.src = URL.createObjectURL(file);
  }
});
