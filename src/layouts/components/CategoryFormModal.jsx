/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';

// atomize
import {
  Div, Row, Col, Text, Button, Icon, Textarea, Modal, Input, Label,
} from 'atomize';
import { SliderPicker } from 'react-color';

function CategoryFormModal(props) {
  const {
    isOpen,
    category,
    handleClose,
    editForm,
    handleSave,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} align="center" rounded="md">
      <Text textSize="heading">{ !_.has(category, 'id') ? '新增' : '編輯' }</Text>
      <Row d="flex" m={{ b: '4rem' }}>
        <Col size="12">
          <Input
            placeholder="標籤名稱"
            w="100%"
            value={category.name}
            onChange={(evt) => editForm(evt.target.value, 'name')}
            m={{
              t: '.25em',
              b: '.25em',
            }}
          />
        </Col>
        <Col size="12">
          <Label m={{ t: '.5em' }}>標籤顏色</Label>
          <SliderPicker
            style={{
              marginTop: '.2em',
            }}
            color={category.color}
            onChangeComplete={(color) => editForm(color.hex, 'color')}
          />
        </Col>
      </Row>
      <Div d="flex" justify="flex-end">
        <Button
          onClick={handleClose}
          bg="gray200"
          textColor="medium"
          m={{ r: '1rem' }}
        >
          取消
        </Button>
        <Button onClick={handleSave} bg="info700">
          保存
        </Button>
      </Div>
    </Modal>
  );
}

export default CategoryFormModal;
