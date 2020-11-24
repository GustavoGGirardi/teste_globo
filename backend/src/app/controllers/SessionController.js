import User from '../models/User';

class SessionController {
  // criar uma session
  async store(req, res) {

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'usuario/senha invalidos' });
      }


      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'usuario/senha invalidos' });
      }

      // returna um json com os dados do usuario e adiciona um campo token

      return res.json({ user, token: User.generateToken(user) });
    } catch (err) {
      return res.status(400).json({ error: "err.message" });
    }


  }
}

export default new SessionController();
