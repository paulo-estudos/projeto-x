const { app } = require('./index');

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});
