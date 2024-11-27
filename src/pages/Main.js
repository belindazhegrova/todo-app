import { Col, Layout, Row, Typography } from "antd";
import React, { useState } from "react";
import Categories from "../layouts/Categories";
import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";
import ActionBar from "../layouts/ActionBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/slices/toDoSlice";

const { Content } = Layout;

const Main = () => {
  const data = useSelector((state) => state.todoTask);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
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

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(null);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTitle(value);
  };

  const filteredTasks = (data || [])
    .flatMap((category) => {
      console.log("Category:", category); // Log each category for debugging
      if (filterStatus === "All") {
        console.log("All status filter applied");
        return category.items;
      }
      if (category.status === filterStatus.status) {
        console.log("Status match found, returning items");
        return category.items;
      }
      console.log("No status match");
      return []; // If the status doesn't match, return an empty array
    })
    .filter((task) => {
      console.log("Task:", task); // Log each task for debugging
      return task.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

  console.log("Filtered Tasks:", filteredTasks);
  console.log("data111", data);
  console.log("filteredTasks", filteredTasks);

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
          <CustomTable data={filteredTasks} openEditModal={openEditModal} />
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
