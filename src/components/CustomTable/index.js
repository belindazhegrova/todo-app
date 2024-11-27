import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

const CustomTable = ({ data, openEditModal }) => {
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
          <Tag color={getStatusColor(status)}>{status}</Tag>
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
          <Button
            onClick={() => openEditModal(record)}
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: "#1264A3",
              color: "white",
            }}
          >
            Edit
          </Button>
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
