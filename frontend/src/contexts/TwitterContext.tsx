import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';

interface ContextProps {
  data: any;
  loading: boolean;
  handleToggleComposeTweet: any;
  toggleComposeTweet: boolean;
  tweet: string;
  setTweet: any;
  postTweet: any;
  updateTweet: any;
  deleteTweet: any;
}

const TwitterContext = createContext({} as ContextProps);

export const useTwitter = () => useContext(TwitterContext);

const TwitterContextProvider = (props: any): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleComposeTweet, setToggleComposeTweet] = useState(false);
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    const getTweets = async () => {
      const API = 'http://localhost:8080/';
      try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTweets();
  }, []);

  const handleToggleComposeTweet = () => {
    toggleComposeTweet === true
      ? setToggleComposeTweet(false)
      : setToggleComposeTweet(true);
  };

  const postTweet = useCallback(async () => {
    if (!tweet) {
      return alert('메시지를 입력해주세요.');
    }

    try {
      const raw = JSON.stringify({
        tweet,
        img: '',
      });

      const response = await fetch('http://localhost:8080/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }, [tweet]);

  const updateTweet = useCallback(
    async (
      obj: { _id: string; tweet: string; img: string },
      message: string
    ) => {
      try {
        const raw = JSON.stringify({
          ...obj,
          tweet: message,
        });

        const response = await fetch(`http://localhost:8080/${obj._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
          redirect: 'follow',
        });

        const result = await response.text();
        console.log(result);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const deleteTweet = useCallback(async (tweetId: string) => {
    console.log('delete');
    try {
      const raw = JSON.stringify({
        tweetId,
      });

      const response = await fetch(`http://localhost:8080/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      });
      const result = await response.text();
      console.log(result);
      console.log('Delete', tweetId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value: ContextProps = {
    data,
    loading,
    toggleComposeTweet,
    handleToggleComposeTweet,
    tweet,
    setTweet,
    postTweet,
    updateTweet,
    deleteTweet,
  };

  return (
    <TwitterContext.Provider value={value}>
      {props.children}
    </TwitterContext.Provider>
  );
};

export default TwitterContextProvider;
