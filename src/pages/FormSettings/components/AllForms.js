import React, { useState, useEffect } from "react";
import Card from "../../../component/sharedComponent/Card/Card";
import { Select, Space, Switch, Table, Tooltip } from "antd";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useSelector } from 'react-redux'
import { GET_ALL_FORMS } from '../../../api/api';
import RingLoader from "../../../component/sharedComponent/RingLoader/RingLoader";

const initSelectValue = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: 'Inactive',
  },
];

function AllForms(props) {

  const { DomainID } = useSelector(state => state.DomainIDSetter)
  const [formStatus, setFormStatus] = useState(true);
  const [allForms, setAllForms] = useState(null);

  const [loading , setloading] = useState(false)

  const {formSettingsref} = props

  useEffect(() => {
    fetchAllForms();
  }, [formStatus , DomainID ]);

  const fetchAllForms = async () => {
    setloading(true)
    try {
      const results = await axios.post(GET_ALL_FORMS, {
        domainID: DomainID,
        status: formStatus
      });
      if (results.data) {
        let forms = results.data.data;
        setAllForms(forms);
      }
      setloading(false)
    } catch (error) {
       console.warn(error)
       setloading(false)
    }
   
  }

  const onChange = (checked) => {
   /*  console.log(`switch to ${checked}`); */
  };

  const handleChange = (value) => {
    setFormStatus(value);
  };

  const columns = [
    {
      title: "Forms",
      dataIndex: "form_label",
      width: "70%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Switch defaultChecked onChange={onChange} />
          <Tooltip title="Edit Form">
            <button
              className="rounded-full"
              style={{
                backgroundColor: '#b9cce5',
                color: '#1677ff',
                padding: 5,
                fontSize: 18
              }}
              onClick={() => props.onEdit(record.domainUrl)}
            >
              <MdEdit />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      {
        !loading ?
      <div className="flex flex-col gap-2">
        <div className="flex  justify-between items-center">
          <h1 className="text-sm font-semibold text-sky-800 uppercase">
            All Forms
          </h1>
          <Select
            defaultValue="Active"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={initSelectValue}
          />
        </div>
        <Card>
          <div style={{ padding: "20px" }}>
            <Table columns={columns} dataSource={allForms} bordered />
          </div>
        </Card>
      </div>
       :<RingLoader/>}
    </div>
  );
}

export default AllForms;
