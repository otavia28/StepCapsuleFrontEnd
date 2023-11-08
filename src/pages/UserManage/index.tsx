import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";
import {FALLBACK} from "@/constant";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 40,
  },
  {
    title: '状态',
    dataIndex: 'isDelete',
    valueType: 'select',    // 枚举值
    width: 72,
    valueEnum: {
      0: {
        text: '正常',
        status: 'Success',
      },
      1: {
        text: '已注销',
        status: 'Error',
      },
    },
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    copyable: true,
  },
  {
    disable: true,
    title: '头像',
    dataIndex: 'avatarUrl',
    copyable: true,
    render: (_, record) => (
      <div>
        <Image
          src={record.avatarUrl || FALLBACK}            // 如果不存在 Url，则返回 FALLBACK
          width={100}
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }} // 添加 onError 处理器，如果存在 Url 但加载失败，则返回 FALLBACK
        />
      </div>
    ),
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    disable: true,
    title: '邮箱',
    dataIndex: 'userEmail',
    copyable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: "dateTime",
    copyable: true,
  },
  {
    title: '最近登录时间',
    dataIndex: 'updateTime',
    valueType: "dateTime",
    copyable: true,
  },
  {
    title: '登录次数',
    dataIndex: 'loginNumber',
    copyable: true,
  },
  {
    title: '步步条数',
    dataIndex: 'stepsNumber',
    copyable: true,
  },
  {
    title: '步步集个数',
    dataIndex: 'stepsGroupsNumber',
    copyable: true,
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',    // 枚举值
    valueEnum: {
      0: {
        text: '用户',
        status: 'Success',
      },
      1: {
        text: '管理员',
        status: 'Error',
      },
    },
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered

      // 表格从后端网前端返回数据
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
