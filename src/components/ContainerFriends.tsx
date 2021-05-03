import { useContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FriendContext, FriendInterface } from '../contexts/FriendContext';
import styles from '../styles/components/ContainerFriends.module.css';
import { BoxFriend } from './BoxFriend';


export function ContainerFriends(objfriends) {
    const { addFriend } = useContext(FriendContext);

    const { friends } = objfriends;
    const { addToast } = useToasts();

    const [filter, setFilter] = useState('');
    const [isAddFriend, setIsAddFriend] = useState(false);

    const [cellMask, setCellMask] = useState('');
    const [imgPreview, setImgPreview] = useState(null);

    function handleChange(e) {
        let filter = e.target.value;
        setFilter(filter);
    }

    function handleImgSubmit(e) {
        if(e.target.files.length > 0){
            setImgPreview(URL.createObjectURL(e.target.files[0]));
        }else{
            setImgPreview('');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        setCellMask('');
        setImgPreview('');

        let newFriend: FriendInterface = {
            name: e.target.nome.value,
            cellphone: String(e.target.tel.value).replace(/\D/g, "").replace(/^0/, ""),
            email: e.target.email.value,
            photo: e.target.photo.files[0]
        }
        addFriend(newFriend);
        addToast(`${e.target.nome.value} foi adicionado a sua lista de amigos !`,
            {
                appearance: 'success',
                autoDismiss: true
            })
        setIsAddFriend(false);
    }

    function tellMask(e) {
        let cell = e.target.value;

        if (String(cell).length <= cellMask.length) {
            setCellMask(cell);
        }

        cell = String(cell).replace(/\D/g, "").replace(/^0/, "");

        if (cell.length > 10) {
            cell = cell.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (cell.length > 5) {
            cell = cell.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (cell.length > 2) {
            cell = cell.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            cell = cell.replace(/^(\d*)/, "($1");
        }

        setCellMask(cell);
    }

    return (
        <>
            {
                !isAddFriend ?
                    <div className={styles.container}>
                        <div className={styles.containerHeader}>
                            <div className={styles.firstContainer}>
                                <button className={styles.buttonHeader} onClick={() => setIsAddFriend(true)}>
                                    <img src="/icons/plus.png"></img>
                                </button>
                                <div>
                                    <h3>Find Friends</h3>
                                </div>
                            </div>
                            <div className={styles.searchContainer}>
                                <div className={styles.searchBar}>
                                    <img src="/icons/loupe.png"></img>
                                    <input className={styles.inputSearch} type="text" placeholder="Enter a friend's name" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerBottom}>                            
                            {                       
                                    friends.length > 0 ?
                                    friends.filter(f => f.name.toLowerCase().includes(filter.toLowerCase())).map((friend, index) => (
                                        <BoxFriend key={index} id={friend.id} name={friend.name} cellphone={friend.cellphone} photoUrl={friend.photoUrl} />
                                    ))
                                    :
                                    <div className={styles.alone}>
                                        <p>Você ainda não adicionou nenhum amigo clique em <strong>+</strong> para adicionar um.</p>
                                    </div>            
                            }
                        </div>
                    </div>
                    :
                    <div className={styles.container}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className={styles.headerAddFriend}>
                                <div className={styles.containerHeaderFriend}>
                                    <button className={styles.buttonHeaderFriend} onClick={() => setIsAddFriend(false)}>
                                        <img src="/icons/back.png"></img>
                                    </button>
                                    <div>
                                        <h3>Add a friend</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.containerBottomAddFriend}>
                                <div className={styles.divImgFriend}>
                                    <label>
                                        <div className={styles.previewImg} style={{
                                            backgroundImage: `url(${imgPreview || '/images/noneImg.png'})`
                                        }}></div>
                                        <input className={styles.inputFile} type="file" name="photo" id="photo" onChange={handleImgSubmit} />
                                    </label>
                                </div>
                                <div className={styles.divInfoFriend}>
                                    <br />
                                    <input autoComplete="none" name="nome" type="text" placeholder="Nome" />
                                    <input autoComplete="none" name="tel" type="cellphone" placeholder="(xx) xxxxx-xxxx" onChange={tellMask} value={cellMask} />
                                    <input name="email" type="email" placeholder="email@email.com" />
                                </div>
                                <div className={styles.divButtonFriend}>
                                    <button type="submit" >
                                        <h3>Salvar</h3>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}