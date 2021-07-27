/*
cadastra o aniversario de todo mundo
no dia avisa
para organizar a vaquinha: oi
!cadastrar os dados separados por linha
!dados meus dados
!participar se inscreve na vaquinha
!vaquina checa o valor da vaquinha atual e quem esta organizndo
!organizar assume ao organizacao da vaquinha
*/

module.exports = {
  dados: require('../commands/getUser.js'),
  cadastrar: require('../commands/updateUser.js'),
  novaVaquinha: require('../commands/newFund.js'),
  vaquinha: require('../commands/getFund.js'),
  participar: require('../commands/addParticipant.js'),
  listar: require('../commands/listUsers.js'),
}