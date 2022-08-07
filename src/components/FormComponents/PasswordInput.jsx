// react
import React from 'react';
import PropTypes from 'prop-types';

// atomize
import { Input, Button, Icon } from 'atomize';

function PasswordInput({
  value, onChange, placeholder, name,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Input
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      m=".5rem"
      value={value}
      onChange={onChange}
      name={name}
      prefix={(
        <Button
          pos="absolute"
          onClick={() => setShowPassword((pre) => !pre)}
          bg="transparent"
          w="3rem"
          top="0"
          right="0"
          rounded={{ r: 'md' }}
          type="button"
        >
          <Icon
            name={showPassword ? 'EyeSolid' : 'Eye'}
            color={showPassword ? 'danger800' : 'success800'}
            size="16px"
          />
        </Button>
        )}
    />
  );
}

PasswordInput.defaultProps = {
  value: '',
  placeholder: '密碼',
  name: null,
  onChange() {},
};

PasswordInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default PasswordInput;
