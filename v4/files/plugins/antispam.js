import fs from "fs"

const configPath = "./src/system/veloxa.json"

const handler = async (m, { args, vx, command }) => {
  // Pastikan file config ada
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ antispam: false }, null, 2))
  }

  const config = JSON.parse(fs.readFileSync(configPath))

  // Kalau belum pilih ON/OFF → kirim button
  if (!args[0]) {
    const sections = [
      {
        title: "🛡️ Pengaturan Anti-Spam",
        rows: [
          { title: "✅ Nyalakan Anti-Spam", description: "Blokir spam otomatis", id: `${command} on true` },
          { title: "❌ Matikan Anti-Spam", description: "Nonaktifkan proteksi spam", id: `${command} off false` }
        ]
      }
    ]

    await vx.sendMessage(m.chat, {
      text: "🧩 Pilih status Anti-Spam di bawah ini:",
      footer: "Veloxa Security System ⚡",
      buttons: [
        {
          buttonId: "antispam-toggle",
          buttonText: { displayText: "⚙️ Ubah Status" },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: "Pilih Mode Anti-Spam",
              sections
            })
          }
        }
      ]
    }, { quoted: m })

    return
  }

  // === Eksekusi ON/OFF ===
  if (args[1] === "true") {
    config.antispam = true
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    return m.reply("✅ *Anti-Spam telah diaktifkan!* Bot akan otomatis memblokir spam atau flood chat.")
  }

  if (args[1] === "false") {
    config.antispam = false
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    return m.reply("🚫 *Anti-Spam dimatikan.* Bot tidak akan memblokir pesan spam.")
  }
}

handler.help = ["antispam"]
handler.tags = ["security"]
handler.command = ["antispam"]

export default handler
