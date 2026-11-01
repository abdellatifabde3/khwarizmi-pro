const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const math = require('mathjs');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' }),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Al-Khwarizmi PRO khdam - trigger=ghiat');
});

client.on('message', async msg => {
    if (msg.fromMe) return;
    const lower = msg.body.toLowerCase();
    if (!lower.includes('ghiat')) return;
    let q = msg.body.toLowerCase().replace('ghiat','').trim();
    if (q === '' || q.includes('salam')) {
        await msg.reply('Salam! I am Al-Khwarizmi with ghiat. Try: ghiat 2+2*10');
        return;
    }
    try {
        let r = math.evaluate(q);
        await msg.reply(q + ' = ' + r);
    } catch (e) {
        await msg.reply('Did not understand: ' + q);
    }
});

client.initialize();