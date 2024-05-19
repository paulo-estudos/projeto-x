const request = require('supertest');
const fs = require('fs');
const { verifyJwt, isPrime } = require('./index');

describe('Testes para a função isPrime', () => {
  it('Deve retornar true para números primos', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(13)).toBe(true);
  });

  it('Deve retornar false para números não primos', () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(8)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(10)).toBe(false);
  });

});

describe('Testes para a função verifyJwt', () => {
  it('Deve retornar "verdadeiro" para um token JWT válido', () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05sIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
    expect(verifyJwt(token)).toBe('verdadeiro');
  });

  it('Deve retornar "falso" para um token JWT inválido', () => {
    const invalidToken = 'invalid_token';
    expect(verifyJwt(invalidToken)).toBe('falso');
  });
});
