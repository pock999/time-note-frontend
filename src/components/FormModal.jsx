/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';

// atomize
import {
  Div, Row, Col, Text, Button, Icon, Textarea, Modal, Input, Dropdown, Anchor,
} from 'atomize';

const types = [{ value: 1, text: '筆記' }, { value: 2, text: '行程(提醒)' }, { value: 3, text: '文章' }];

function FormModal({
  isOpen, handleClose, note, editForm, handleSave,
}) {
  const [showTypeSelect, setShowTypeSelect] = React.useState(false);
  const [showCategorySelect, setShowCategorySelect] = React.useState(false);

  const categories = useSelector((state) => state.category.list);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} align="center" rounded="md">
      <Text textSize="heading">{ !_.has(note, 'id') ? '新增' : '編輯' }</Text>
      <Row d="flex" m={{ b: '4rem' }}>
        <Col size="12">
          <Input
            placeholder="標題"
            w="100%"
            value={note.title}
            onChange={(evt) => editForm(evt.target.value, 'title')}
            m={{
              t: '.25em',
              b: '.25em',
            }}
          />
        </Col>
        <Col size="12">
          <Textarea
            placeholder="內容"
            w="100%"
            value={note.content}
            onChange={(evt) => editForm(evt.target.value, 'content')}
            m={{
              t: '.25em',
              b: '.25em',
            }}
          />
        </Col>
        <Col size="12">
          <Dropdown
            m={{
              t: '.25em',
              b: '.25em',
            }}
            isOpen={showTypeSelect}
            name="type"
            onClick={() => setShowTypeSelect((pre) => !pre)}
            menu={(
              <Div>
                {types
                  .map((item, index) => (
                    <Anchor
                      d="block"
                      p="0.5rem"
                      key={item.value}
                      onClick={() => {
                        editForm(item.value, 'type');
                        setShowTypeSelect(false);
                      }}
                    >
                      {item.text}
                    </Anchor>
                  ))}
              </Div>
            )}
          >
            {note.type && _.get(types.find((item) => `${item.value}` === `${note.type}`), 'text')}
          </Dropdown>
        </Col>
        <Col size="12">
          <Dropdown
            m={{
              t: '.25em',
              b: '.25em',
            }}
            name="CategoryId"
            isOpen={showCategorySelect}
            onClick={() => setShowCategorySelect((pre) => !pre)}
            menu={(
              <Div>
                <Anchor
                  d="block"
                  p="0.5rem"
                  onClick={() => {
                    editForm(null, 'CategoryId');
                    setShowCategorySelect(false);
                  }}
                >
                  無
                </Anchor>
                {
                  _.isArray(categories) && categories.map((category) => (
                    <Anchor
                      d="block"
                      p="0.5rem"
                      key={category.id}
                      onClick={() => {
                        editForm(category.id, 'CategoryId');
                        setShowCategorySelect(false);
                      }}
                    >
                      {category.name}
                    </Anchor>
                  ))
                }
              </Div>
            )}
          >
            {
              (note.CategoryId && _.isArray(categories))
                ? categories.find((item) => item.id === note.CategoryId).name
                : '無'
            }
          </Dropdown>
        </Col>
        <Col size="12">
          <Input
            type="datetime-local"
            placeholder="開始時間"
            w="100%"
            value={note.startAt}
            onChange={(evt) => editForm(evt.target.value, 'startAt')}
            m={{
              t: '.25em',
              b: '.25em',
            }}
          />
        </Col>
        <Col size="12">
          <Input
            type="datetime-local"
            placeholder="結束時間"
            w="100%"
            value={note.endAt}
            onChange={(evt) => editForm(evt.target.value, 'endAt')}
            m={{
              t: '.25em',
              b: '.25em',
            }}
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

FormModal.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  note: {},
  editForm: () => {},
  handleSave: () => {},
};

FormModal.defaultProps = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  note: PropTypes.object,
  editForm: PropTypes.func,
  handleSave: PropTypes.func,
};

export default FormModal;
