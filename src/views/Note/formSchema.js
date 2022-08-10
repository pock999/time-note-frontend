import * as yup from 'yup';

export const createSchema = yup.object().shape({
  title: yup
    .string()
    .test('len', '標題不得為空', (val) => val.length > 0)
    .required(),
  content: yup.string().required(),
  type: yup.mixed().oneOf([1, 2, 3]).required('請選擇類型'),
  CategoryId: yup.number().nullable(true),
  timePoint: yup.date().required('請選擇紀錄(提示)時間'),
});

export const updateSchema = yup.object().shape({
  id: yup.number().required().positive().integer(),
  title: yup
    .string()
    .test('len', '標題不得為空', (val) => val.length > 0)
    .required(),
  content: yup.string().required(),
  type: yup.mixed().oneOf([1, 2, 3]).required('請選擇類型'),
  CategoryId: yup.number().nullable(true),
  timePoint: yup.date().required('請選擇紀錄(提示)時間'),
});
