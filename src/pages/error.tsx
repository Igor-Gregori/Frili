import styles from '../styles/pages/error.module.css'

export default function error(){
    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1>Erro</h1>
                <br/><br/>
                <p>Provavelmente você não iniciou a api "friend list api", baixe a api e execute a aplicação na porta 3333</p> 
                <br />
                <a target="_blank" href="https://github.com/Igor-Gregori/frili-API">https://github.com/Igor-Gregori/frili-API</a>
            </div>
        </div>
    )
}