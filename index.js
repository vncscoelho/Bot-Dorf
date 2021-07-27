const Discord = require('discord.js');
const Database = require("@replit/database");
const keep_alive = require('./keep_alive.js');
const client = new Discord.Client({ 
  ws: { 
    intents: [
      'GUILDS',
      'GUILD_MEMBERS',
      'GUILD_PRESENCES',
      'GUILD_MESSAGES',
      'GUILD_VOICE_STATES',
      'GUILD_MESSAGE_TYPING',
      'GUILD_MESSAGE_REACTIONS',
      'DIRECT_MESSAGES',
    ] 
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const token = process.env.token;
const cron = require("node-cron");
const db = new Database();
const User = require('./user.js');
const commands = require('./commands');
const checkForBirthdays = require('./checkForBirthdays.js');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

client.on('ready', async () => {
  client.channels.fetch("836314595601023048")
    .then(async chatGeral => {
      cron.schedule("30 08 * * *", async () => {
        checkForBirthdays(db).then(async people => {
          const names = people.map(user => `${user.name}`);
          const gif = await axios.get('https://api.giphy.com/v1/gifs/random?api_key=LKnTr4GHb4zu5JY48JZFOsIhE1tHoJFu&tag=birthday&rating=pg-13');
          const bdayMessage = new MessageEmbed()
            .setTitle('TEM ~~MUCHER~~ DE NIVER!!!')
            .setDescription(`
            Parabéns **${names.join(' e ')}**!! :partying_face: :confetti_ball::balloon: :birthday: :people_hugging: :clap: 
            `).
            setURL('https://www.youtube.com/watch?v=WIPezXDQB54').
            setImage(gif.data.data.image_original_url).
            setFooter('Uma nova vaquinha foi criada, mande uma DM pro bot para participar!');

          commands.novaVaquinha(db, null, {});
          chatGeral.send(bdayMessage);
        }).catch(e => console.error(e))
      }, {
          scheduled: true,
          timezone: "America/Sao_Paulo"
        });
    });
    console.log("Is ready");
});

client.on('message', async (message) => {
  const commandList = new MessageEmbed().
    setTitle(':rotating_light: Todos os comandos são por mensagem privada ao bot')
    .setAuthor('Comandos do Bot Dorf')
    .setDescription(`
      **:writing_hand: cadastrar *dia/mês (seu niver, ex: 20/05)* # *endereço* # *presente 1, presente 2, presente 3...* # *chave PIX***
      — faz o cadastro do seus dados, separados por JOGO DA VELHA ( # )

      **:cow2: vaquinha**
      — mostra a vaquinha atual

      **:hand_splayed: participar**
      — cadastra seu nome para participar da vaquinha atual

      **:game_die: dados**
      — exibe seus dados como estão cadastrados no bot
    `);

  if (message.author.id === '857985300961427456') {
    return;
  }

  if (message.channel.type === 'dm') {
    const [command, ...args] = message.content.split(' ');

    if (commands.hasOwnProperty(command)) {
      return commands[command](db, message, args);
    } 
    
    return message.author.send(commandList)
  }

  if (message.content === '!comandos') {
    message.channel.send(commandList);
  }
});

client.login(token);