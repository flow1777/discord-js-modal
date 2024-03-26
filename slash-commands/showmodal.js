const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    run: async ({ interaction }) => {
        const modal = new ModalBuilder({
            customId: `myModal-${interaction.user.id}`,
            title: 'Meu modal',
        });

        const favoriteColorInput = new TextInputBuilder({
            customId: 'favoriteColorInput',
            label: "Qual a sua cor favorita?",
            style: TextInputStyle.Short,
        });

        const hobbiesInput = new TextInputBuilder({
            customId: 'hobbiesInput',
            label: "Qual sao os seus hobbies favoritos?",
            style: TextInputStyle.Paragraph,
        });

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        modal.addComponents(firstActionRow, secondActionRow);
        
        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === `myModal-${interaction.user.id}`;

        interaction
            .awaitModalSubmit({ filter , time: 30_000 })
            .then((modalInteraction) => {
                const favoriteColorValue = modalInteraction.fields.getTextInputValue('favoriteColorInput')
                const hobbiesValue = modalInteraction.fields.getTextInputValue('hobbiesInput')

                modalInteraction.reply(`Your favorite color: ${favoriteColorValue}\nYour hobbies: ${hobbiesValue}`);
            })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
    },
  
    data: {
      name: 'showmodal',
      description: 'Shows a modal!',
    },
  };
  