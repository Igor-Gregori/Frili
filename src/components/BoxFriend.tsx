import { useContext } from 'react';
import {FriendContext} from '../contexts/FriendContext';
import styles from '../styles/components/BoxFriend.module.css';

export function BoxFriend({ id, name, cellphone, photoUrl }) {
    const { deleteFriend } = useContext(FriendContext);

    function formatCellphone(cell: String) {
        return `(${cell.substr(0, 2)}) ${cell.substr(2, 1)} ${cell.substr(3, 4)}-${cell.substr(7, 4)}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.boxImage}>
                <div className={styles.containerImage}>
                    <img src={`http://localhost:3333/imagefriend/${photoUrl}`} />
                </div>
                <div className={styles.boxInfo} >
                    <strong>{name}</strong>
                    <p>{formatCellphone(cellphone)}</p>
                </div>
            </div>
            <div className={styles.boxButton}>
                <button className={styles.buttonRemove} type="button" onClick={() => deleteFriend(id)}>
                    <strong>Remove</strong>
                </button>
            </div>
        </div>
    )
}