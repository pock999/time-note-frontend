// react
import React from 'react';
import PropTypes from 'prop-types';

// atomize
import { Input, Icon } from 'atomize';

function AccountInput({ value, onChange }) {
  return (
    <Input
      placeholder="Email"
      p={{ x: '2.5rem' }}
      m=".5rem"
      value={value}
      onChange={onChange}
      prefix={(
        <Icon
          name="UserSolid"
          color="warning800"
          size="16px"
          cursor="pointer"
          pos="absolute"
          top="50%"
          left="0.75rem"
          transform="translateY(-50%)"
        />
      )}
    />
  );
}

AccountInput.defaultProps = {
  value: '',
  onChange() {},
};

AccountInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default AccountInput;
