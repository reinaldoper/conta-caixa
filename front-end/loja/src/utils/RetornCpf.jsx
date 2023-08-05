const formatCpf = (input) => {
  const cpf = input.replace(/\D/g, '').slice(0, 11);
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1$2$3-$4');
};

export default formatCpf;