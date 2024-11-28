import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, DragOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
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
      title: "",
      dataIndex: "drag",
      key: "drag",
      render: () => <DragOutlined style={{ cursor: "move" }} />,
      align: "center",
      width: 40,
      responsive: ["md", "sm"],
    },
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
      render: (notes) => {
        const truncatedNotes =
          notes.length > 100 ? notes.slice(0, 100) + "..." : notes;

        return <span dangerouslySetInnerHTML={{ __html: truncatedNotes }} />;
      },
    },

    {
      title: "Action",
      key: "action",
      width: 220,
      render: (record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              backgroundColor: "#FE4C4A",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DndProvider backend={HTML5Backend} style={{}}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        scroll={{
          x: 200,
        }}
        rowKey={(record, index) => index}
        components={{
          body: {
            row: (props) => (
              <DraggableRow
                style={{ tableLayout: "fixed !important" }}
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
