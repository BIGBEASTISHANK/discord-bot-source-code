const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'wiki',
    aliases: [''],
    permissions: [],
    cooldown: 0,
    async execute(client, message, cmd, args, Discord) {

        const wiki = args.slice().join(' ')
        if (!wiki) return message.channel.send({ embed: { color: `#00f2ff`, description: 'Provide A Query To Search.' } }) // If Nothing Is Searched
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For It

        let response
        try {
            response = await fetch(url).then(res => res.json())
        }
        catch (e) {
            return message.channel.send({ embed: { color: `#00f2ff`, description: 'An Error Occured, Try Again.' } })
        }

        try {
            if (response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
                const embed = new MessageEmbed()
                    .setColor('#00f2ff')
                    .setTitle(response.title)
                    .setURL(response.content_urls.desktop.page)
                    .setDescription([`
                ${response.extract}
                Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
                message.channel.send(embed)
            }
            else { // If Only One Result
                const embed = new MessageEmbed()
                    .setColor('#00f2ff')
                    .setTitle(response.title)
                    .setThumbnail(response.thumbnail.source)
                    .setURL(response.content_urls.desktop.page)
                    .setDescription(response.extract)
                message.channel.send(embed)
            }
        }
        catch {
            return message.channel.send({ embed: { color: `#00f2ff`, description: 'Provide A Valid Query To Search.' } }) // If Searched Query Is Not Available
        }
    }
}