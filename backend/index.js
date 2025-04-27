const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// 環境変数を使えるようにする
dotenv.config();

const app = express();
const port = 3001;

// JSONボディをパースできるようにする
app.use(express.json());

// POSTエンドポイントを作る
app.post('/api/post-tweet', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'テキストが必要です' });
  }

  try {
    const response = await axios.post(
      'https://api.twitter.com/2/tweets',
      { text: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('ツイート成功:', response.data);
    res.status(200).json({ status: 'ツイート成功', data: response.data });

  } catch (error) {
    console.error('ツイート失敗:', error.response?.data || error.message);
    res.status(500).json({ error: 'ツイート失敗しました', detail: error.response?.data });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
