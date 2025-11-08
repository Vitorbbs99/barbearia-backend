import express from "express";
import cors from "cors";
import mysql from 'mysql2';

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vitor@1',
  database: 'bd_barbearia'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conexão ao MySQL estabelecida com sucesso!');
});

// Rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  // Consulta SQL: busca o usuário que corresponda ao login e senha fornecidos
  const sql = 'SELECT id, usuario, nome FROM usuarios WHERE usuario = ? AND senha = ?';
  const params = [usuario, senha];

  connection.query(sql, params, (err, results) => {
      if (err) {
          console.error('Erro na consulta ao banco de dados:', err.message);
          return res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
      }

      // Verifica se algum resultado foi retornado (usuário encontrado)
      if (results.length > 0) {
          const user = results[0];
          
          // Login bem-sucedido
          res.json({
              sucesso: true,
              token: "fake-token-" + Math.random().toString(36).substring(2, 9),
              id: user.id,
              usuario: user.usuario,
              nome: user.nome,
          });
      } else {
          // Nenhum usuário encontrado com as credenciais fornecidas
          res.status(401).json({ 
              sucesso: false, 
              mensagem: 'Usuário ou senha inválidos' 
          });
      }
    });
});

app.get('/clientes', (req, res) => {
 connection.query("SELECT * FROM clientes", function(err, results){
    if (err) {
        console.error('Erro na consulta ao banco de dados:', err.message);
        return null;
    }
    if (results.length > 0) {
        res.json(results);
    } else {
       console.log("Erro ao buscar no banco");
    }
    });
});

app.get('/clientes', (req, res) => {
  connection.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err.message);
      return res.status(500).json({ erro: "Erro ao buscar clientes" });
    }
    res.json(results);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, telefone, idPlano, status } = req.body;

  if (!nome || !idPlano) {
    return res.status(400).json({ erro: "Nome e plano são obrigatórios" });
  }

  const query = "INSERT INTO clientes (nome, telefone, idPlano, status) VALUES (?, ?, ?, ?)";
  connection.query(query, [nome, telefone, idPlano, status || 1], (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err.message);
      return res.status(500).json({ erro: "Erro ao cadastrar cliente" });
    }
    res.json({ sucesso: true, id: result.insertId });
  });
});

app.put('/clientes/:id', (req, res) => {
  const itemId = req.params.id;
  const { nome, telefone, idPlano, status } = req.body;

  const query = "UPDATE clientes SET nome = ?, telefone = ?, idPlano = ?, status = ? WHERE id = ?";
  connection.query(query, [nome, telefone, idPlano, status || 1, itemId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err.message);
      return res.status(500).json({ erro: "Erro ao atualizar cliente" });
    }
    res.json({ sucesso: true, id: result.updateId });
  });
});

app.delete('/clientes', (req, res) => {
  const {id} = req.body;

  const query = "DELETE FROM clientes WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err.message);
      return res.status(500).json({ erro: "Erro ao deletar cliente" });
    }
    res.json({ sucesso: true, id: result.deleteId });
  });
});

app.get('/planos', (req, res) => {
 connection.query("SELECT * FROM planos", function(err, results){
    if (err) {
        console.error('Erro na consulta ao banco de dados:', err.message);
        return null;
    }
    if (results.length > 0) {
        res.json(results);
    } else {
       console.log("Erro ao buscar no banco");
    }
    });
});

app.post('/planos', (req, res) => {
  const { titulo, valor, texto } = req.body;

  if (!titulo || !valor) {
    return res.status(400).json({ erro: "Titulo e valor são obrigatórios" });
  }

  const query = "INSERT INTO planos (titulo, valor, texto) VALUES (?, ?, ?)";
  connection.query(query, [titulo, valor, texto], (err, result) => {
    if (err) {
      console.error('Erro ao inserir plano:', err.message);
      return res.status(500).json({ erro: "Erro ao cadastrar o plano" });
    }
    res.json({ sucesso: true, id: result.insertId });
  });
});

app.delete('/planos', (req, res) => {
  const {id} = req.body;

  const query = "DELETE FROM planos WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar plano:', err.message);
      return res.status(500).json({ erro: "Erro ao deletar plano" });
    }
    res.json({ sucesso: true, id: result.deleteId });
  });
});

app.put('/planos/:id', (req, res) => {
  const itemId = req.params.id;
  const { titulo, valor, texto } = req.body;

  const query = "UPDATE planos SET titulo = ?, valor = ?, texto = ? WHERE id = ?";
  connection.query(query, [titulo, valor, texto, itemId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar plano:', err.message);
      return res.status(500).json({ erro: "Erro ao atualizar plano" });
    }
    res.json({ sucesso: true, id: result.updateId });
  });
});

app.put('/usuarios/:id', (req, res) => {
  const itemId = req.params.id;
  const { nome, senha, email } = req.body;

  const query = "UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id = ?";
  connection.query(query, [nome, senha, email, itemId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err.message);
      return res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
    res.json({ sucesso: true, id: result.updateId });
  });
});

app.get('/usuarios/:id', (req, res) => {
 const itemId = req.params.id;
 
 const query = "SELECT * FROM usuarios WHERE id = ?";
 connection.query(query, [itemId], (err, result) => {
   if (err) {
      console.error('Erro ao pegar o usuário:', err.message);
      return res.status(500).json({ erro: "Erro ao pegar o usuário" });
    }
    res.json(result);
    });
});

// Teste rápido
app.get("/", (req, res) => {
  res.send("API da Barbearia está rodando ✅");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
