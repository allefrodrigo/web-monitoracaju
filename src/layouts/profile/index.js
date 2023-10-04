import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton, TextField, Button, Card, Tooltip, Stack } from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
  Edit as EditIcon,
  List as ListIcon,
} from "@mui/icons-material";

// Componentes compartilhados
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Overview() {
  const [allPosts, setAllPosts] = useState([]);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState("");
  const [newPost, setNewPost] = useState({
    imageUrl: "",
    title: "",
    text: "",
    postUrl: "",
  });
  const [editingPost, setEditingPost] = useState({
    imageUrl: "",
    title: "",
    text: "",
    postUrl: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: "success",
    icon: "check",
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    imageUrl: "",
    title: "",
    text: "",
    postUrl: "",
  });

  const [editErrors, setEditErrors] = useState({
    imageUrl: "",
    title: "",
    text: "",
    postUrl: "",
  });

  const toggleCreating = () => {
    setIsCreating(!isCreating);
    setErrors({
      imageUrl: "",
      title: "",
      text: "",
      postUrl: "",
    });
  
  };

  const toggleEditing = (post) => {
    setPostId(post._id)
    setIsEditing(!isEditing);
    setEditingPost(post);
  };

  const handlePostChange = (e, isEditing) => {
    const { name, value } = e.target;
    const post = isEditing ? editingPost : newPost;
    const updatedPost = { ...post, [name]: value };
    isEditing ? setEditingPost(updatedPost) : setNewPost(updatedPost);
    setDescriptionLength(value.length);

  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (color, title, content) => {
    setSnackbar({ open: true, color, title, content });
  };

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${backendUrl}/posts/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setAllPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const editPost = async (postId) => {
    // Validação dos campos para edição
    const { imageUrl, title, text, postUrl } = editingPost;
    const newEditErrors = {
      imageUrl: "",
      title: "",
      text: "",
      postUrl: "",
    };

    if (!imageUrl) {
      newEditErrors.imageUrl = "Campo não pode estar vazio.";
    }

    if (!title) {
      newEditErrors.title = "Campo não pode estar vazio.";
    }

    if (!text) {
      newEditErrors.text = "Campo não pode estar vazio.";
    }

    if (!postUrl) {
      newEditErrors.postUrl = "Campo não pode estar vazio.";
    } else if (!isUrlValid(postUrl)) {
      newEditErrors.postUrl = "URL inválido.";
    }

    if(editingPost.text.length < 250) {
      newEditErrors.text = "O campo de texto deve ter pelo menos 250 caracteres.";
    }
    

    
    setEditErrors(newEditErrors);

    if (Object.values(newEditErrors).every((error) => !error)) {
      try {
        const authToken = localStorage.getItem("authToken");
        await axios.put(`${backendUrl}/posts/${postId}`, editingPost, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-access-token": authToken,
          },
        });
        fetchData();
        setEditingPost({ imageUrl: "", title: "", text: "", postUrl: "" });
        setIsEditing(false);
        showSnackbar("success", "Informação editada com sucesso!", "A informação foi editada com sucesso.");
      } catch (error) {
        console.error("Error editing post:", error);
        showSnackbar("error", "Erro ao editar informação!", "Ocorreu um erro ao editar a informação, tente novamente.");
      }
    }
  };

  const isUrlValid = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return pattern.test(url);
  };
  

  const createPost = async () => {
    // Validação dos campos
    const { imageUrl, title, text, postUrl } = newPost;
    const newErrors = {
      imageUrl: "",
      title: "",
      text: "",
      postUrl: "",
    };

    if (!imageUrl) {
      newErrors.imageUrl = "Campo não pode estar vazio.";
    }

    if (!title) {
      newErrors.title = "Campo não pode estar vazio.";
    }

    if (!text) {
      newErrors.text = "Campo não pode estar vazio.";
    }

    if (!postUrl) {
      newErrors.postUrl = "Campo não pode estar vazio.";
    } else if (!isUrlValid(postUrl)) {
      newErrors.postUrl = "URL inválido.";
    }
    if (newPost.text.length < 250) {
      setErrors({ ...errors, text: "O campo de texto deve ter pelo menos 250 caracteres." });
      return;
    }

    setErrors(newErrors);

    // Se não houver erros, continue com a criação do post
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const authToken = localStorage.getItem("authToken");
        await axios.post(`${backendUrl}/posts`, newPost, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-access-token": authToken,
          },
        });
        fetchData();
        setNewPost({ imageUrl: "", title: "", text: "", postUrl: "" });
        setIsCreating(false);
        showSnackbar("success", "Informação cadastrada com sucesso!", "A informação foi cadastrada com sucesso.");
      } catch (error) {
        console.error("Error creating post:", error);
        showSnackbar("error", "Erro ao cadastrar informação!", "Ocorreu um erro ao cadastrar a informação, tente novamente.");
      }
    }
  };

  const deletePost = async (postId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`${backendUrl}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      fetchData();
      showSnackbar("success", "Informação deletada com sucesso!", "A informação foi deletada com sucesso.");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <MDBox px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" fontSize={40}>
          Informações úteis
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography variant="button" color="text">
            Gerencie aqui os links úteis para serem disponibilizados aos usuários da plataforma Monitora Caju.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="flex-end" alignItems="center">
          <Button startIcon={isCreating ? <ListIcon /> : <AddCircleIcon />} onClick={toggleCreating}>
            {isCreating ? "Listar Informações" : "Criar Nova Informação"}
          </Button>
        </MDBox>
      </MDBox>
      {!isCreating ? (
        <MDBox p={2}>
          {!isEditing ? (
            <Grid container spacing={2}>
              {allPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                  <DefaultProjectCard
                    key={post._id}
                    image={post.imageUrl}
                    title={post.title}
                    description={post.text}
                    link={post.postUrl}
                    actions={
                      <>
                        <Tooltip title="Ver Link">
                          <IconButton
                            aria-label="link"
                            size="small"
                            component="a"
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar link">
                          <IconButton aria-label="edit" size="small" onClick={() => toggleEditing(post)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar link">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                            onClick={() => deletePost(post._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} lg={12}>
                <MDTypography variant="h6" fontWeight="medium" fontSize={20}>
                  Editar informação
                </MDTypography>
                <MDTypography variant="body2" fontWeight="light" fontSize={14}>
                  Insira os novos dados da informação abaixo, caso não queira alterar algum campo, deixe-o como esta.
                </MDTypography>
                <Card>
                  <Grid container spacing={2} p={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="imageUrl"
                        label="URL da Imagem"
                        value={editingPost.imageUrl}
                        onChange={(e) => handlePostChange(e, true)}
                        error={!!editErrors.imageUrl}
                        helperText={editErrors.imageUrl}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="postUrl"
                        label="URL do Post"
                        value={editingPost.postUrl}
                        onChange={(e) => handlePostChange(e, true)}
                        error={!!editErrors.postUrl}
                        helperText={editErrors.postUrl}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="title"
                        label="Título"
                        value={editingPost.title}
                        onChange={(e) => handlePostChange(e, true)}
                        error={!!editErrors.title}
                        helperText={editErrors.title}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
    fullWidth
    multiline
    rows={4}
    name="text"
    label="Texto de Descrição"
    value={isEditing ? editingPost.text : newPost.text}
    onChange={(e) => handlePostChange(e, isEditing)}
    error={!!(isEditing ? editErrors.text : errors.text)}
    helperText={(isEditing ? editErrors.text : errors.text) || `Mínimo de 250 caracteres (${descriptionLength} caracteres digitados)`}
  />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <MDButton variant="gradient" color="success" onClick={() => editPost(postId)}>
                          Editar informação
                        </MDButton>
                        <MDButton variant="gradient" color="error" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </MDButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </MDBox>
      ) : (
        <MDBox p={2}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} lg={12}>
              <MDTypography variant="h6" fontWeight="medium" fontSize={20}>
                Criar uma nova informação
              </MDTypography>
              <MDTypography variant="body2" fontWeight="light" fontSize={14}>
                Insira os dados da nova informação abaixo.
              </MDTypography>
              <Card>
                <Grid container spacing={2} p={3}>
                  <Grid item xs={12}>
                  
                  <TextField
                      fullWidth
                      name="imageUrl"
                      label="URL da Imagem"
                      value={newPost.imageUrl}
                      onChange={(e) => handlePostChange(e, false)}
                      error={!!errors.imageUrl}
                      helperText={errors.imageUrl}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="postUrl"
                      label="URL do Post"
                      value={newPost.postUrl}
                      onChange={(e) => handlePostChange(e, false)}
                      error={!!errors.postUrl}
                      helperText={errors.postUrl}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="title"
                      label="Título"
                      value={newPost.title}
                      onChange={(e) => handlePostChange(e, false)}
                      error={!!errors.title}
                      helperText={errors.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Grid item xs={12}>
  <TextField
    fullWidth
    multiline
    rows={4}
    name="text"
    label="Texto de Descrição"
    value={newPost.text}
    onChange={(e) => handlePostChange(e, false)}
    error={!!errors.text}
    helperText={(errors.text || `Mínimo de 250 caracteres (${descriptionLength} caracteres digitados)`)}
  />
</Grid>

                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <MDButton variant="gradient" color="success" onClick={createPost}>
                        Criar nova informação
                      </MDButton>
                      <MDButton variant="gradient" color="error" onClick={toggleCreating}>
                        Cancelar
                      </MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      <MDSnackbar
        color={snackbar.color}
        icon={snackbar.icon}
        title={snackbar.title}
        content={snackbar.content}
        open={snackbar.open}
        onClose={handleSnackbarClose}
        close={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
