const formatZodError = () => {
  const erroFormatado = {};

  error.erros.forEach((err) => {
    const path = err.path[0];
    if (!erroFormatado[path]) {
      erroFormatado[path] = [];
    }
    erroFormatado[path].push(err.message);
  });
  return erroFormatado;
};

export default formatZodError;
