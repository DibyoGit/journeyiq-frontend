import React from 'react'
import Card from '../../component/sharedComponent/Card/Card';
import { Space, Select, Input, Table, Button, Tooltip  } from 'antd';
import { FaUserAlt } from 'react-icons/fa'
import { IoTrashBin } from "react-icons/io5";

function AddEditUserPermission() {

  const handleChange = (value) => {
    /* console.log(`selected ${value}`); */
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      width: '60%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <div>
            <label>Email Notify</label>
            <Select
              defaultValue="1"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: '1',
                  label: 'Enabled',
                },
                {
                  value: '0',
                  label: 'Disabled',
                },
              ]}
            />
          </div>
          <div>
            <label>Misleads or all leads</label>
            <Select
              defaultValue="all"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'all',
                  label: 'All Leads',
                },
                {
                  value: 'missleads',
                  label: 'Only Misleads',
                },
              ]}
            />
          </div>
          {/* <a className='text-lg text-red-600'><IoTrashBin/></a> */}
          <Tooltip title="Remove (clear access)">
            <Button
              className='mt-5'
              danger
              onClick={() => console.log('clear data')}
            >
              <IoTrashBin />
            </Button>
          </Tooltip>
        </Space>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      username: 'abcd@obi.com',
    },
    {
      key: '2',
      username: 'jim@obi.com',
    },
    {
      key: '3',
      username: 'joe@obi.com',
    },
  ];


  return (
    <div className='p-4 ' >
      <div className='flex flex-col gap-2'>
        <div className='flex  justify-between items-center '>
          <h1 className='text-sm font-semibold text-sky-800'>ADD/EDIT USER PERMISSIONS</h1>
        </div>
        <Card>
          <div style={{ padding: "20px" }}>
            <p className='text-xs text-slate-800 mb-3'>Invite a new User (allow access):</p>
            <div className='flex flex-row justify-between gap-2'>
              <Input
                size='medium'
                style={{
                  width: '85%'
                }}
                placeholder='Enter and Email of a user to invite and give the access to your dashboard'
              />
              <button
                style={{
                  backgroundColor: 'rgba(13, 92, 169, 255)',
                  padding: 12,
                  color: '#ffffff',
                  borderRadius: 5,
                  fontSize: 12
                }}
              >
                Invite and Allow Access
              </button>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <h3 className='text-sm text-sky-800 mb-3'>Invited users</h3>
            <span className='text-xs text-slate-800'>Manage an access for already invited users:</span>

            <Table
              columns={columns}
              dataSource={data}
              bordered
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddEditUserPermission