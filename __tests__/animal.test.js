const request = require('supertest');
const app = require('../src/app');

describe('Testes de Cadastro de Animais', () => {

  beforeEach(async () => {
    
    await request(app).delete('/animais');
  });

  it('deve cadastrar um animal com sucesso', async () => {
    const response = await request(app)
      .post('/animais')
      .send({
        nome: 'Spike',
        especie: 'Cachorro',
        idade: 3
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('nome', 'Spike');
    expect(response.body).toHaveProperty('especie', 'Cachorro');
    expect(response.body).toHaveProperty('idade', 3);  
  });

  it('deve retornar erro ao tentar cadastrar um animal com idade inválida', async () => {
    const response = await request(app)
      .post('/animais')
      .send({
        nome: 'Rex',
        especie: 'Cachorro',
        idade: 'invalid'  
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'A idade deve ser um número');
  });

  it('deve retornar erro ao tentar cadastrar um animal com nome muito curto', async () => {
    const response = await request(app)
      .post('/animais')
      .send({
        nome: 'J',  
        especie: 'Hamster',
        idade: 1
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'O nome deve ter pelo menos 2 caracteres');
  });

  it('deve retornar a lista de animais com status 200', async () => {
    
    await request(app).post('/animais').send({ nome: 'Spike', especie: 'Cachorro', idade: 3 });
    await request(app).post('/animais').send({ nome: 'Rex', especie: 'Gato', idade: 5 });
    await request(app).post('/animais').send({ nome: 'Fido', especie: 'Cachorro', idade: 2 });

    const response = await request(app).get('/animais');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);  
  });

  afterAll(async () => {
    
    await request(app).delete('/animais');
  });
});
