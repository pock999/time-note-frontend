import reducer, { setAuthorization } from '../../src/store/reducers/auth';

describe('=== store/auth ===', () => {
  it('回傳初始狀態', () => {
    expect(reducer(undefined, {})).toEqual({
      authorization: null,
      user: null,
      roles: null,
      currentRole: null,
    });
  });

  it('設定token', () => {
    const previousState = {};
    expect(reducer(previousState, setAuthorization('aaaa1234xxxx'))).toEqual({
      authorization: 'aaaa1234xxxx',
      user: null,
      roles: null,
      currentRole: null,
    });
  });
});
