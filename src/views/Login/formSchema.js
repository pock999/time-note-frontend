import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .test('len', 'Email不得為空', (val) => val.length > 0)
    .email('必須為Email格式')
    .required(),
  password: yup.string().required(),
});

export const reigsterSchema = yup.object().shape({
  email: yup
    .string()
    .test('len', '標題不得為空', (val) => val.length > 0)
    .email('必須為Email格式')
    .required(),
  password: yup.string().required(),
  name: yup
    .string()
    .test('len', '名字不得為空', (val) => val.length > 0)
    .required(),
});
