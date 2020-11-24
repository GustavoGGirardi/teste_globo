import React, { useEffect, useState, useRef, useCallback } from 'react';

import Cards from '../../components/PostsCard'

import Button from '../../components/Button';
import Modal from '../../components/Modal'

import { ConteinerCard, Content, Container, ConteinerTitle, InputTitle, InputText, ContainerForm } from './styles'

import { useAuth } from '../../hooks/auth';
import { signInSchema, signInErrors } from '../../utils/yupSingIn';
import { toast } from 'react-toastify';

import api from '../../services/api'


function Posts() {
  const { signOut } = useAuth();
  const [data, setData] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [newPost, setNewPost] = useState(false)
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [token, setToken] = useState(null)

  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {

    const USER_TOKEN = localStorage.getItem('@SEU_APP:token')
    const AuthStr = 'Bearer '.concat(USER_TOKEN)

    setToken(AuthStr)

    console.log(token)

    const getPosts = async () => {

      const response = await api.get('/post',{ headers: { Authorization: AuthStr } });

      const res = response.data;

      setData(res);
      console.log(res)
    }

    getPosts()

  },[newPost])

  function handleClickModal() {
    setModalStatus(!modalStatus)
  }

  const createPost = useCallback(async ({ title, body }) => {
    try {
      const USER_TOKEN = localStorage.getItem('@SEU_APP:token')
      const AuthStr = 'Bearer '.concat(USER_TOKEN)

      const response = await api.post('/post',
        {
          title,
          body,
        }, {
          headers: {
            Authorization: AuthStr
          }});

      const res = response.data;
      setData(...data, res);
    } catch ({ response }) {
      const { error } = response.data;
      toast.error(error);
    }
  }, []);


  const handleSubmit = evt => {
    evt.preventDefault();

    const title = titleRef.current.value;

    const body = bodyRef.current.value;

    try {
      createPost({ title, body });
      setModalStatus(false);
      setNewPost(!newPost);

    } catch (err) {
      const errors = signInErrors(err);

      setFormErrors(errors);
    }
  };

  const handleDelete = () => {
    setNewPost(!newPost)
  }

  const handleUpdate = () => {
    setNewPost(!newPost)
  }

  return (
    <>
    <Container>
      <ConteinerTitle>
        <h1>Postagens</h1>
      </ConteinerTitle>

      <Content>

        {data.length > 0 ?
          <>
            {data.map((post) => {
              return (
                <ConteinerCard>
                <Cards
                  title={post.title}
                  body={post.body}
                  data={post}
                  handleDelete={handleDelete}
                  token={token}
                  handleUpdate={handleUpdate}
                />
              </ConteinerCard>
            )
            })}
          </>
          : <p>Não há postagens</p>
        }

      </Content>
      <Button name="Sair" onClick={signOut} style={{width:150}}>
          Sair
      </Button>
      <Button name="New" onClick={handleClickModal} style={{width:150, marginLeft:20}}>
          New
      </Button>

      <Modal status={modalStatus} setStatus={setModalStatus}>
          <ContainerForm>
            <label>Novo Post</label>
            <InputTitle
            type='text'
            placeholder='Titulo'
            id="title"
            label="Title"
            ref={titleRef}
            name="title"
            error={formErrors.title}
            />

            <InputText
            placeholder='Texto'
            type='text'
            placeholder='Texto'
            id="body"
            label="Title"
            ref={bodyRef}
            name="body"
            error={formErrors.body}
            />

            <Button name="Salvar" style={{width:120, marginLeft:20}} onClick={handleSubmit}>
                Salvar
            </Button>
          </ContainerForm>
      </Modal>
    </Container>

    </>
  )
}

export default Posts;
