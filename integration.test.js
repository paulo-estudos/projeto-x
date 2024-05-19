const request = require('supertest');
const { app } = require('./index');

describe('Teste de integração para a rota /verify-jwt', () => {
  it('Deve retornar "verdadeiro" para um token JWT válido', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05sIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
    
    const response = await request(app)
      .post('/verify-jwt')
      .set('Content-Type', 'text/plain') // Definindo o tipo de conteúdo como texto simples
      .send(token);

    expect(response.status).toBe(200);
    expect(response.text).toBe('verdadeiro');
  });

  it('Deve retornar "falso" para um token JWT inválido', async () => {
    const invalidToken = 'invalid_token';
    
    const response = await request(app)
      .post('/verify-jwt')
      .set('Content-Type', 'text/plain') // Definindo o tipo de conteúdo como texto simples
      .send(invalidToken);

    expect(response.status).toBe(200);
    expect(response.text).toBe('falso');
  });
});
