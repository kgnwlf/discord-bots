var giveRole = (id, role, client) => {
  client.guilds.cache.get('857035524716232744').members.cache.get(id).roles.add(role);
}

var removeRole = (id, role, client) => {
  client.guilds.cache.get('857035524716232744').members.cache.get(id).roles.remove(role);
}

const botIds = {
  '936831625378037821': 'Praetor Boticus Maximus',
  '935416368499675177': 'Terra Bot',
  '935614070957158410': 'Sun God Acolyte'
}

module.exports = {
  giveRole,
  removeRole,
  botIds: botIds
};