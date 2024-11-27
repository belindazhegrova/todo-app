import { Col, Layout, Row, Modal } from "antd";
import React, { useState } from "react";
import Categories from "../layouts/Categories";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import ActionBar from "../layouts/ActionBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "../store/slices/toDoSlice";
import CustomDeleteModal from "../components/CustomDeleteModal";

const { Content } = Layout;

const Main = () => {
  const data = useSelector((state) => state.todoTask);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  const handleStatusChange = (selectedCategory) => {
    setFilterStatus(selectedCategory);
  };

  const handleSubmitTask = (task) => {
    if (editMode) {
      dispatch(editTask({ id: editMode.id, updatedTask: task }));
    } else {
      dispatch(addTask({ status: task.status, task }));
    }

    setModalOpen(false);
  };

  const openEditModal = (task) => {
    setEditMode(task);
    setModalOpen(true);
  };

  const openDeleteModal = (taskId) => {
    setDeleteTaskId(taskId);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteTaskId) {
      dispatch(deleteTask({ id: deleteTaskId }));
      setDeleteModalOpen(false);
      setDeleteTaskId(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(null);
    setDeleteModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTitle(value);
  };

  const filteredTasks = (data || [])
    .flatMap((category) => {
      if (filterStatus === "All") {
        return category.items;
      }
      if (category.status === filterStatus.status) {
        return category.items;
      }
      return [];
    })
    .filter((task) => {
      return task.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

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
          handleSearchChange={handleSearchChange}
          searchTitle={searchTitle}
        />
      </Row>
      <Row className="table">
        <Col span={24}>
          <CustomTable
            data={filteredTasks}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
            openDeleteModal={openDeleteModal}
          />
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
      {deleteModalOpen && (
        <CustomDeleteModal
          open={deleteModalOpen}
          onSubmit={handleDelete}
          onClose={closeModal}
        />
      )}
    </Content>
  );
};

export default Main;
