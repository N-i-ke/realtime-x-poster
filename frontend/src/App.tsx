import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const handlePost = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/post-tweet', {
        text: 'テスト投稿だよ！'
      });
      setMessage('成功: ' + res.data.status);
    } catch (error) {
      console.error(error);
      setMessage('エラーが発生しました');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ツイートポストアプリ🚀</h1>
      <button onClick={handlePost}>ポストする！</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
