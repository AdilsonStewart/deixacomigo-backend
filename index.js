const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.use(express.json());

// Configura Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-3308867332576574-031619-69cf930ce0947ef3ca9aa4c69135cde9-332636958'
});

app.post('/criar-pagamento', async (req, res) => {
  console.log('🔥 HEROKU ACORDANDO COM PIMENTA!');
  
  const { valor, produto } = req.body;

  try {
    const preference = {
      items: [
        {
          title: `🌶️ ${produto} PICANTE - DeixaComigo`,
          unit_price: parseFloat(valor),
          quantity: 1,
        }
      ],
      back_urls: {
        success: "https://deixacomigoweb.netlify.app/sucesso",
        failure: "https://deixacomigoweb.netlify.app/erro", 
        pending: "https://deixacomigoweb.netlify.app/erro"
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences.create(preference);
    
    console.log('✅ PAGAMENTO CRIADO COM PIMENTA!');
    res.json({ 
      success: true, 
      id: result.body.id,
      message: '🌶️ Tá saindo na hora!'
    });
    
  } catch (error) {
    console.error('❌ ERRO PICANTE:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Deu pimenta nos olhos! ' + error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.send('🚀 BACKEND COM PIMENTA RODANDO!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 BACKEND COM PIMENTA RODANDO NA PORTA ' + PORT);
});
