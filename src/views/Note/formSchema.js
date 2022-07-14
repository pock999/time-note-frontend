import * as yup from 'yup';

export const createSchema = yup.object().shape({
  title: yup
    .string()
    .test('len', '標題不得為空', (val) => val.length > 0)
    .required(),
  content: yup.string().required(),
  type: yup.mixed().oneOf([1, 2, 3]).required('請選擇類型'),
  CategoryId: yup.number().nullable(true),
  startAt: yup.date().required('請選擇開始日期'),
  endAt: yup
    .date()
    .required('請選擇結束日期')
    .min(yup.ref('startAt'), '結束時間須比開始時間大'),
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
  startAt: yup.date().required('請選擇開始日期'),
  endAt: yup
    .date()
    .required('請選擇結束日期')
    .min(yup.ref('startAt'), '結束時間須比開始時間大'),
});
