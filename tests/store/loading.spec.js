import reducer, {
  showLoading,
  hideLoading,
  setLoading,
} from '../../src/store/reducers/loading';

describe('=== store/loading ===', () => {
  it('回傳初始狀態', () => {
    expect(reducer(undefined, {})).toEqual({
      isShow: false,
    });
  });

  describe('actions', () => {
    it('showLoading', () => {
      const previousState = {
        isShow: false,
      };

      expect(reducer(previousState, showLoading())).toEqual({
        ...previousState,
        isShow: true,
      });
    });

    it('hideLoading', () => {
      const previousState = {
        isShow: true,
      };

      expect(reducer(previousState, hideLoading())).toEqual({
        ...previousState,
        isShow: false,
      });
    });

    it('setLoading', () => {
      const previousState = {
        isShow: true,
      };

      expect(reducer(previousState, setLoading(false))).toEqual({
        ...previousState,
        isShow: false,
      });
    });
  });
});
