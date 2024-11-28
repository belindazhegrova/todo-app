import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomButton from "../CustomButton";

const type = "row";

const DraggableRow = ({ record, index, moveRow, children, ...restProps }) => {
  const [, drag] = useDrag({
    type,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => drag(drop(node))} {...restProps}>
      {children}
    </tr>
  );
};

const CustomTable = ({ data, openEditModal, openDeleteModal }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const moveRow = (fromIndex, toIndex) => {
    const updatedData = [...tableData];
    const [movedRow] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedRow);

    setTableData(updatedData);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      New: "#EE8A35",
      "in Progress": "#F6CB52",
      "on Hold": "#E9C466",
      Canceled: "#E75651",
      Completed: "#7AC14D",
    };
    return statusColors[status] || "#EE8A35";
  };

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
          <Tag style={{ padding: "5px 20px" }} color={getStatusColor(status)}>
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
          <CustomButton
            icon={<EditOutlined />}
            title="Edit"
            onChange={() => openEditModal(record)}
            customStyle={{
              backgroundColor: "#1264A3",
            }}
          />
          <CustomButton
            icon={<DeleteOutlined />}
            title="Delete"
            onChange={() => openDeleteModal(record.id)}
            customStyle={{
              marginLeft: "10px",
              backgroundColor: "#FE4C4A",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey={(record, index) => index}
        components={{
          body: {
            row: (props) => (
              <DraggableRow
                {...props}
                index={props["data-row-key"]}
                record={tableData[props["data-row-key"]]}
                moveRow={moveRow}
              />
            ),
          },
        }}
      />
    </DndProvider>
  );
};

export default CustomTable;
