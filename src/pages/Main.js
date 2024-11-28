import { Col, Layout, Row, Modal } from "antd";
import React, { useCallback, useState } from "react";
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
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    task: null,
  });

  const [searchTitle, setSearchTitle] = useState("");

  const handleStatusChange = (selectedCategory) => {
    setFilterStatus(selectedCategory);
  };

  const openModal = useCallback((type, task = null) => {
    setModalState({ open: true, type, task });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ open: false, type: null, task: null });
  }, []);

  const handleSubmitTask = useCallback(
    (task) => {
      if (modalState.type === "edit") {
        dispatch(editTask({ id: modalState.task.id, updatedTask: task }));
      } else if (modalState.type === "add") {
        dispatch(addTask({ status: task.status, task }));
      }

      closeModal();
    },
    [dispatch, modalState, closeModal]
  );

  const handleDelete = useCallback(() => {
    if (modalState.type === "delete") {
      dispatch(deleteTask({ id: modalState.task }));
      closeModal();
    }
  }, [dispatch, modalState, closeModal]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTitle(value);
  };

  const filteredTasks = (data || [])
    .flatMap((category) =>
      filterStatus === "All" || category.status === filterStatus.status
        ? category.items
        : []
    )
    .filter((task) =>
      task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

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
          setModalOpen={() => openModal("add")}
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
            openEditModal={(task) => openModal("edit", task)}
            handleDelete={handleDelete}
            openDeleteModal={(task) => openModal("delete", task)}
          />
        </Col>
      </Row>

      {modalState.open &&
        (modalState.type === "add" || modalState.type === "edit") && (
          <CustomModal
            filterStatus={filterStatus}
            categories={data}
            editMode={modalState.task}
            onClose={closeModal}
            onSubmit={handleSubmitTask}
            open={modalState.open}
          />
        )}
      {modalState.open && modalState.type === "delete" && (
        <CustomDeleteModal
          open={modalState.open}
          onSubmit={handleDelete}
          onClose={closeModal}
        />
      )}
    </Content>
  );
};

export default Main;
