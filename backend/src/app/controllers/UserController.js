import User from '../models/User';

class UserController {
  // metodo de criação do usuario
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Usuario já cadastrado' });
    }

    const user = await User.create(req.body);

    user.password = undefined;

    return res.json(user);
  }

  // metodo para listagem de usuarios cadastrados
  async index(req, res) {
    const user = await User.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 5,
        sort: '-createdAt',
      }
    );

    return res.json(user);
  }

  // metodo para listagem de usuario especifico
  async show(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario Não encontrado' });
    }

    return res.json(user);
  }

  // metodo para atualizar um usuario
  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario Não encontrado' });
    }

    return res.json(user);
  }

  // metodo para excluir um usuario
  async destroy(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario Não encontrado' });
    }

    return res.json({ Deletado: 'usuario deletado' });
  }
}

export default new UserController();
