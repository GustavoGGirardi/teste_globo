import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  password: Yup.string().required('Senha é obrigatório'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,100}$/, // letra ma
  //   'Digite uma senha forte. Ex: Nbb_885522',
  // ),
});

export const signInErrors = err => {
  const { inner } = err;
  const errors = {};

  if (inner && inner[0]) {
    inner.forEach(error => {
      const { path, message } = error;

      if (!errors[path]) {
        errors[path] = message;
      }
    });
  }

  return errors;
};
