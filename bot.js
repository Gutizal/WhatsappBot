const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Carrega as configurações de mensagens do arquivo JSON
let chatMessages;
try {
    const config = fs.readFileSync('./messagesConfig.json', 'utf8');
    chatMessages = JSON.parse(config).chatMessages;
} catch (error) {
    console.error('Erro ao ler o arquivo de configuração:', error);
    process.exit(1); // Encerra o programa em caso de erro
}

// Inicializa o cliente do WhatsApp com a estratégia de autenticação LocalAuth
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true } // Roda o Puppeteer em modo headless
});

// Evento disparado quando o QR code é recebido
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Evento disparado quando o cliente está pronto para uso
client.on('ready', () => {
    console.log('Client is ready!');
    sendMessageRepeatedly();
});

// Evento disparado após autenticação bem-sucedida
client.on('authenticated', () => {
    console.log('Authenticated');
});

// Evento disparado em caso de falha na autenticação
client.on('auth_failure', msg => {
    console.error('Authentication failure', msg);
});

// Evento disparado quando o cliente é desconectado
client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
    client.initialize(); // Re-inicializa o cliente caso seja desconectado
});

// Função para enviar mensagens diferenciadas
function sendMessageRepeatedly() {
    const interval = 400; // Intervalo de 400 milisegundos

    Object.entries(chatMessages).forEach(([chatId, message]) => {
        setInterval(() => {
            client.sendMessage(chatId, message)
            .then(response => {
                console.log('Mensagem enviada');
            })
            .catch(err => {
                console.error('Erro ao enviar mensagem', err);
            });
        }, interval);
    });
}

// Inicializa o cliente
client.initialize();
