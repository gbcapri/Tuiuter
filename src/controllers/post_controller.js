import Post from '../models/post-model.js';
import jwtService from '../services/jwt-service.js';

// Criação de um novo post
export const create = async (req, res) => {
  try {
    const decodedUser = jwtService.verifyAccessToken(req.headers.authorization);

    const post = await Post.create({
      text: req.body.text,
      user: decodedUser.id, // Associa o post ao usuário autenticado
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Listar todos os posts do usuário autenticado
export const show = async (req, res) => {
  try {
    // Decodifica o token para obter o usuário autenticado
    const decodedUser = jwtService.verifyAccessToken(req.headers.authorization);

    const posts = await Post.find({ user: decodedUser.id }).exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Atualizar um post do usuário autenticado
export const update = async (req, res) => {
  try {
    // Decodifica o token para obter o usuário autenticado
    const decodedUser = jwtService.verifyAccessToken(req.headers.authorization);

    // Verifica se o post pertence ao usuário autenticado
    const post = await Post.findOne({ _id: req.params.id, user: decodedUser.id }).exec();
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado ou não pertence ao usuário' });
    }

    post.text = req.body.text || post.text;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Deletar um post do usuário autenticado
export const destroy = async (req, res) => {
  try {
    // Decodifica o token para obter o usuário autenticado
    const decodedUser = jwtService.verifyAccessToken(req.headers.authorization);

    // Verifica se o post pertence ao usuário autenticado
    const post = await Post.findOne({ _id: req.params.id, user: decodedUser.id }).exec();
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado ou não pertence ao usuário' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
