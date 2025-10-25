const handler = async (m, { sock }) => {
  const start = new Date().getTime()
  await m.reply("Pinging...")
  const end = new Date().getTime()
  const responseTime = end - start
  m.reply(`🏓 Pong, My Name Is Veloxa!\nResponse time: ${responseTime}ms`)
}

handler.help = ["ping"]
handler.tags = ["info"]
handler.command = ["ping"]

export default handler
