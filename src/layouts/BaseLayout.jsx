import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

// redux store
import { logoutAction } from '../store/reducers/auth';
import {
  fetchCategories, fetchCategory, createCategory, updateCategory, deleteCategory,
} from '../store/reducers/category';
import {
  fetchNoteTypes,
} from '../store/reducers/note';

// custom utils
import SwalHelper from '../utils/SwalHelper';

// custom components
import {
  AppSidebar, AppBar, DrawerContent, AppTopMenu, CategoryFormModal,
} from './components';

const emptyCategory = {
  name: '',
  color: '#969696',
};

export default function BaseLayout(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const drawerTypes = useSelector((state) => state.layout.drawerTypes);
  const drawerCategories = useSelector((state) => state.layout.drawerCategories);

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchNoteTypes());
      await dispatch(fetchCategories());
    })();
  }, []);

  //
  // category
  //
  // FormModal is open
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...emptyCategory });

  // 關閉category編輯
  const closeForm = async () => {
    setModalOpen(false);
    setFormData({ ...emptyCategory });
  };

  const openForm = async ({ rowId = null }) => {
    console.log('openForm ===');
    if (rowId) {
      const resultAction = await dispatch(fetchCategory({ id: rowId }));
      const data = await unwrapResult(resultAction);

      setModalOpen((pre) => {
        setFormData(data);
        return true;
      });
    } else {
      setModalOpen((pre) => {
        setFormData({
          ...emptyCategory,
        });
        return true;
      });
    }
  };

  // 對category編輯(onChange)
  const editForm = (value, target) => {
    // console.log('value => ', value);
    // console.log('target => ', target);
    setFormData((pre) => ({
      ...pre,
      [target]: value,
    }));
  };

  // 保存
  const saveForm = async () => {
    try {
      let resultAction;
      console.log('formData => ', formData);

      if (formData.id) {
        resultAction = await dispatch(updateCategory(formData));
      } else {
        resultAction = await dispatch(createCategory(formData));
      }

      await unwrapResult(resultAction);

      SwalHelper.success(`${formData.id ? '更新' : '新增'}成功`);

      closeForm();
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  const deleteCategoryItem = async (id, name) => {
    try {
      const questionResult = await SwalHelper.awiatQuestion(`是否刪除"${name}"分類?`, null);

      if (questionResult.isConfirmed) {
        const resultAction = await dispatch(deleteCategory({ id }));

        await unwrapResult(resultAction);

        SwalHelper.success('刪除成功');
      }
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  return (
    <AppSidebar
      appBar={AppBar}
      topMenu={<AppTopMenu />}
      drawerContent={(
        <DrawerContent
          drawerTypes={drawerTypes}
          drawerCategories={drawerCategories}
          pathname={location.pathname}
          openForm={openForm}
          deleteCategory={deleteCategoryItem}
        />
      )}
    >
      <CategoryFormModal
        isOpen={modalOpen}
        category={formData}
        handleClose={() => closeForm()}
        editForm={editForm}
        handleSave={() => saveForm()}
      />
      <Div
        tag="main"
        flexGrow="1"
        p={{
          b: '.5em',
          l: '.5em',
          r: '.5em',
        }}
        d="flex"
        justify="center"
        align="flex-start"
      >
        {props.children}
      </Div>
    </AppSidebar>
  );
}
