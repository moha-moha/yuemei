import React, { PropTypes } from 'react'
import { Table, Modal, Tag } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import moment from 'moment'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, location }) {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => <span>{moment(text).fromNow(true).split(' ')[0]}岁</span>,
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '预约时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      render: (text) => <span>{text}</span>,
    }, {
      title: '剩余次数',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => <Tag color={text <= 3 ? 'orange' : 'blue'}>剩余{text}次</Tag>,
    }, {
      title: '住址(小区)',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '客户来源',
      dataIndex: 'comefrom',
      key: 'comefrom',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改信息' }, { key: '2', name: '删除用户' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true })}
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        scroll={{ x: 1200 }}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onDetailItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default list
