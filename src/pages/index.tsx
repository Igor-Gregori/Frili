import Head from 'next/head';
import { ContainerFriends } from '../components/ContainerFriends';
import { FriendProvider } from '../contexts/FriendContext';
import api from '../service/api';
import styles from '../styles/pages/home.module.css';

export default function Home(props) {
  const {friends} = props;
  return (
    <FriendProvider>
      <div>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="shortcut icon" href="icons/loupe.png" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
          <link href="/fonts/MyriadPro-Light.otf" rel="stylesheet" />

          <title>Find Friends</title>
        </Head>
        <div className={styles.container}>
          <ContainerFriends friends={friends} />
        </div>
      </div>
    </FriendProvider>
  )
}

export async function getStaticProps() {
  try {
    const res = await api.get('/friends');

    const friends = res.data;

    return {
      props: { friends }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }

}