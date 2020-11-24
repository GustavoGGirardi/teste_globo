import Post from '../models/Post';

class PostController {
  // metodo de criação do post
  async store(req, res) {
    try {
      const post = await Post.create({ ...req.body, user: req.userId });

      return res.json(post);
    } catch (err) {
      return res.status(400).json({ error: 'Error creating new Post' });
    }
  }

  // metodo para listagem de posts
  async index(req, res) {
    try {
      const post = await Post.find().populate('user');

      return res.json(post);
    } catch (err) {
      return res.json({ error: 'Error Loading Posts' });
    }
  }

  // metodo para listagem de usuario especifico
  async show(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate('user');

      return res.json(post);
    } catch (err) {
      return res.json({ error: 'Error Loading Post' });
    }
  }

  // metodo para atualizar um usuario
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.json(post);
    } catch (err) {

      return res.status(400).json({ error: 'Error editing Post' });
    }
  }

  // metodo para excluir um usuario
  async destroy(req, res) {
    try {
      await Post.findByIdAndRemove(req.params.id);

      return res.json({ message: 'deletado' });
    } catch (err) {
      return res.json({ error: 'Error Delete Post' });
    }
  }
}

export default new PostController();
