import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns'

import Modal from '../../components/Modal'

import {InputTitle, InputText, ContainerForm } from './styles'

import api from '../../services/api'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    fontSize: 18,
    marginBottom: 16,
  },
  data: {
    fontSize: 12,
  }


});

export default function PostCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deletePost(item) {
    try {
      if (
        window.confirm(
          "Tem certeza que deseja deletar " + item.title
        )
      ) {
        console.log(item._id)
        await api.delete(`/post/${item._id}`, { headers: { Authorization: props.token } });
      } else {
      }

      props.handleDelete()
    } catch (error) {
      console.warn(error);
    }
  }


  const updatePost = async (item) => {
    try {

      const title = titleRef.current.value;
      const body = bodyRef.current.value;

      await api.put(`/post/${item._id}`, {
        title,
        body
      },{
        headers: {
          Authorization: props.token
        }});

      handleClose()
      props.handleUpdate()

    } catch (error) {
      console.warn(error);
    }
  }


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.title}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
        {props.body}
        </Typography>

        <Typography className={classes.data} color="textSecondary">
        {"Data de criação: " + format(new Date(props.data.createdAt), 'dd/MM/yyyy')}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>Editar</Button>
        <Button size="small" onClick={() => deletePost(props.data)}>Excluir</Button>
      </CardActions>

      <Modal status={open} setStatus={setOpen}>
          <ContainerForm>
            <label>update Post</label>
            <InputTitle
            type='text'
            placeholder='Titulo'
            id="title"
            label="Title"
            defaultValue={props.title}
            ref={titleRef}
            name="title"
            error={formErrors.title}
            />

            <InputText
            placeholder='Texto'
            type='text'
            id="body"
            defaultValue={props.body}
            label="Title"
            ref={bodyRef}
            name="body"
            error={formErrors.body}
            />

            <Button name="Salvar" style={{width:120, marginLeft:20}} onClick={() => {updatePost(props.data)}}>
                Salvar
            </Button>
          </ContainerForm>
      </Modal>
    </Card>
  );
}
