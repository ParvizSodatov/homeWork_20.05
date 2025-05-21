import { useState } from "react";
import "./App.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { DeleteOutlined, DeleteOutlineRounded } from "@mui/icons-material";

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Parviz Sodatov", description: "Developer", completed: false },
    { id: 2, name: "Neymar Jr", description: "Talent", completed: false },
    { id: 3, name: "Asensio", description: "BadBoy", completed: true },
    { id: 4, name: "Azam", description: "Goodboy", completed: false },
    { id: 5, name: "Messi", description: "Goat", completed: true },
  ]);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [addName, setAddName] = useState("");
  const [addDesc, setDesc] = useState("");
  const [addComp, setAddComp] = useState(false);

  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editComp, setEditComp] = useState("");
  const [idx, setIdx] = useState(null);

  function handleDel(id) {
    setUsers(users.filter((us) => us.id !== id));
  }

  function addFunc() {
    const newUser = {
      id: Date.now(),
      name: addName,
      description: addDesc,
      completed: addComp,
    };
    setUsers([...users, newUser]);
    setAddModal(false);
    setAddName("");
    setDesc("");
    setAddComp(false);
  }

  function handleEdit(user) {
    openEditModal(user.id);
    setEditModal(true);
  }

  function openEditModal(id) {
    const found = users.find((user) => user.id === id);
    if (found) {
      setEditName(found.name);
      setEditDesc(found.description);
      setEditComp(found.completed ? "true" : "false");
      setIdx(found.id);
    }
  }

  function editUser() {
    setUsers(
      users.map((user) =>
        user.id === idx
          ? {
              ...user,
              name: editName,
              description: editDesc,
              completed: editComp === "true",
            }
          : user
      )
    );
    setEditModal(false);
  }

  return (
    <>
      <Button variant="contained" className="add" onClick={() => setAddModal(true)}>
        Add +
      </Button>

      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.description}</TableCell>
                <TableCell align="center">
                  <div className="actions">
                    <Checkbox checked={user.completed} />
                   <DeleteOutlineRounded
                     color="error"
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => handleDel(user.id)}
                   />
                    <Button variant="contained" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Modal */}
      <Dialog onClose={() => setAddModal(false)} open={addModal}>
        <DialogTitle>Add User</DialogTitle>
        <Box className="box" component="form" noValidate autoComplete="off">
          <TextField
            value={addName}
            onChange={({ target }) => setAddName(target.value)}
            label="Add Name"
            variant="outlined"
          />
          <TextField
            value={addDesc}
            onChange={({ target }) => setDesc(target.value)}
            label="Add Description"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel>Completed</InputLabel>
            <Select
              value={addComp}
              onChange={({ target }) => setAddComp(target.value)}
              label="Completed"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
            <Button variant="outlined" onClick={() => setAddModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={addFunc}>Save</Button>
          </div>
        </Box>
      </Dialog>

      {/* Edit Modal */}
      <Dialog onClose={() => setEditModal(false)} open={editModal}>
        <DialogTitle>Edit User</DialogTitle>
        <Box className="box" component="form" noValidate autoComplete="off">
          <TextField
            value={editName}
            onChange={({ target }) => setEditName(target.value)}
            label="Edit Name"
            variant="outlined"
          />
          <TextField
            value={editDesc}
            onChange={({ target }) => setEditDesc(target.value)}
            label="Edit Description"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel>Completed</InputLabel>
            <Select
              value={editComp}
              onChange={({ target }) => setEditComp(target.value)}
              label="Completed"
            >
              <MenuItem value={"true"}>Active</MenuItem>
              <MenuItem value={"false"}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
            <Button variant="outlined" onClick={() => setEditModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={editUser}>Save</Button>
          </div>
        </Box>
      </Dialog>
    </>
  );
}
