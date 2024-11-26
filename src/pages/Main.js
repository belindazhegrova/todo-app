import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  Layout,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import Categories from "../layouts/Categories";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import { categories } from "../mockData/categories";
import ActionBar from "../layouts/ActionBar";

const { Content } = Layout;
const { Text } = Typography;

const Main = () => {
  const [data, setData] = useState(categories);
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const handleStatusChange = (selectedCategory) => {
    setFilterStatus(selectedCategory);
  };

  const handleSubmitTask = (newTask) => {
    setIsLoading(true);
    if (editMode) {
      setData((prev) => {
        const updatedData = prev.map((category) => ({
          ...category,
          items: category.items.filter((item) => item.id !== newTask.id),
        }));

        return updatedData.map((category) =>
          category.status === newTask.status
            ? {
                ...category,
                items: [...category.items, newTask],
              }
            : category
        );
      });
    } else {
      setData((prev) =>
        prev.map((category) =>
          category.status === newTask.status
            ? {
                ...category,
                items: [...category.items, newTask],
              }
            : category
        )
      );
    }
    setIsLoading(false);
  };

  const openEditModal = (task) => {
    setEditMode(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(null);
  };

  const filteredTasks =
    filterStatus === "All"
      ? data.flatMap((category) => category.items)
      : data
          .filter((category) => category.status === filterStatus.status)
          .flatMap((category) => category.items);

  return (
    <Content
      className="main"
      style={{
        backgroundColor: "#ffffff",
        margin: "20px",
        borderRadius: "10px",
        padding: "40px",
        minHeight: "80vh",
      }}
    >
      <Row className="categories" justify="center">
        <Col span={24}>
          <Categories categories={data} onChange={handleStatusChange} />
        </Col>
      </Row>
      <Row
        className="container"
        gutter={[8, 16]}
        style={{ margin: "25px 0px" }}
      >
        <ActionBar
          setModalOpen={setModalOpen}
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
        />
      </Row>
      <Row className="table">
        <Col span={24}>
          <Spin spinning={isLoading} tip="Loading...">
            <CustomTable data={filteredTasks} openEditModal={openEditModal} />
          </Spin>
        </Col>
      </Row>

      {modalOpen && (
        <CustomModal
          filterStatus={filterStatus}
          categories={data}
          editMode={editMode}
          onClose={closeModal}
          onSubmit={handleSubmitTask}
          open={() => setModalOpen(true)}
        />
      )}
    </Content>
  );
};

export default Main;
