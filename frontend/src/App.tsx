import { useTwitter } from './contexts/TwitterContext';
import './App.css';

function App() {
  const {
    data,
    loading,
    toggleComposeTweet,
    handleToggleComposeTweet,
    postTweet,
    updateTweet,
    deleteTweet,
    tweet,
    setTweet,
  } = useTwitter();

  return (
    <div className="App">
      <input
        type="text"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="메시지를 입력해주세요."
      />
      <button
        onClick={() => {
          postTweet();
          setTweet('');
        }}
      >
        New Tweet
      </button>

      <ul>
        {data.map(
          (item: { _id: string; tweet: string; img: string }, key: number) => (
            <li key={key}>
              {item.tweet}
              <button onClick={() => updateTweet(item, 'Tweet updated')}>
                Update
              </button>
              <button onClick={() => deleteTweet(item._id)}>Delete</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
