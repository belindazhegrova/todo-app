import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import React from "react";

const CustomTable = ({ data }) => {
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <span>
          <Tag
            color={
              status === "New"
                ? "#EE8A35"
                : status === "in Progress"
                ? "#F6CB52"
                : status === "on Hold"
                ? "#E9C466"
                : status === "Canceled"
                ? "#E75651"
                : status === "Completed"
                ? "#7AC14D"
                : "#EE8A35"
            }
            style={{
              width: "130px",
              height: "26px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {status}
          </Tag>
        </span>
      ),
    },
    {
      title: "Asigned To",
      dataIndex: "asignTo",
      key: "asignTo",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (notes) => <span dangerouslySetInnerHTML={{ __html: notes }} />,
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          {/* <Button
            onClick={() => handleEditMode(record)}
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "#1264A3",
              color: "white",
            }}
          >
            Edit
          </Button> */}
          {/* <Button
            onClick={() => handleDelete(record)}
            style={{
              backgroundColor: "#FE4C4A",
              width: "30px",
              height: "30px",
            }}
            icon={<DeleteOutlined style={{ color: "white" }} />}
          ></Button> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default CustomTable;
