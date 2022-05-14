import reducer, {
  setAuthorization,
  setUser,
  setRoles,
  setCurrentRole,
  clearAuth,
} from '../../src/store/reducers/auth';

describe('=== store/auth ===', () => {
  it('回傳初始狀態', () => {
    expect(reducer(undefined, {})).toEqual({
      authorization: null,
      user: null,
      roles: null,
      currentRole: null,
    });
  });

  describe('actions', () => {
    it('setAuthorization', () => {
      const previousState = {
        authorization: null,
        user: null,
        roles: null,
        currentRole: null,
      };

      expect(reducer(previousState, setAuthorization('aaaa1234xxxx'))).toEqual({
        ...previousState,
        authorization: 'aaaa1234xxxx',
      });
    });

    it('setUser', () => {
      const previousState = {
        authorization: null,
        user: null,
        roles: null,
        currentRole: null,
      };

      expect(
        reducer(previousState, setUser({ email: 'test1@test.com', name: test }))
      ).toEqual({
        ...previousState,
        user: { email: 'test1@test.com', name: test },
      });
    });

    it('setRoles', () => {
      const previousState = {
        authorization: null,
        user: null,
        roles: null,
        currentRole: null,
      };

      expect(reducer(previousState, setRoles(['Admin', 'User']))).toEqual({
        ...previousState,
        roles: ['Admin', 'User'],
      });
    });

    it('setCurrentRole', () => {
      const previousState = {
        authorization: null,
        user: null,
        roles: null,
        currentRole: null,
      };

      expect(reducer(previousState, setCurrentRole('Admin'))).toEqual({
        ...previousState,
        currentRole: 'Admin',
      });
    });

    it('clearAuth', () => {
      const previousState = {
        authorization: '123',
        user: { email: 'foo@bar.com', name: 'foo' },
        roles: ['User'],
        currentRole: 'User',
      };

      expect(reducer(previousState, clearAuth())).toEqual({
        authorization: null,
        user: null,
        roles: null,
        currentRole: null,
      });
    });
  });
});
