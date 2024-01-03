import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserContext } from '../../../context/UserContext'
import styles from '../style/Navbar.module.css'
import { faArrowRightFromBracket, faBookMedical, faBowlFood, faCaretRight, faDumbbell, faGear, faHouse, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Button, Divider } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AddWorkoutModal from '../../Modals/AddWorkoutModal'

const Navbar = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const {activeUser, logoutActiveUser} = useUserContext()
    const navigate = useNavigate()

    const logout = () => {
        console.log("hello")
        axios.post("/auth/logout", {}, {withCredentials: true})
            .then(res => {
                if(res.status === 202) {
                    logoutActiveUser()
                    navigate("/")
                }
            })
            .catch(err => console.log(err))
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className={styles.Navbar} style={activeUser ? {display: "inline-block"} : {display: "none"}}>
            <AddWorkoutModal open={modalIsOpen} closeModal={closeModal}/>
            <div>
                <h1 style={{margin: "0 auto", fontSize: 25, marginTop: 10, marginLeft: 10}}><FontAwesomeIcon fontSize={25} icon={faBookMedical}/>Health journal</h1>
                <div className={styles.userPartDiv}>
                    <h3 className={styles.userPartName}>{activeUser?.username}</h3>
                    <Button onClick={() => setModalIsOpen(!modalIsOpen)} style={{marginTop: 10}} type="primary"><FontAwesomeIcon icon={faPlus}/> Add workout</Button>
                </div>
            </div>
            <br /> <br />
            <Divider />
            <div className={styles.navbarLink}><FontAwesomeIcon fontWeight={"light"} icon={faCaretRight}/> <FontAwesomeIcon icon={faHouse}/> Dashboard</div>
            <div className={styles.navbarLink}><FontAwesomeIcon fontWeight={"light"} icon={faCaretRight}/> <FontAwesomeIcon icon={faUserGroup}/> Friends</div>
            <div className={styles.navbarLink}><FontAwesomeIcon fontWeight={"light"} icon={faCaretRight}/> <FontAwesomeIcon icon={faDumbbell}/> Workout library</div>
            <div className={styles.navbarLink}><FontAwesomeIcon fontWeight={"light"} icon={faCaretRight}/> <FontAwesomeIcon icon={faBowlFood}/> Food library</div>
            <div className={styles.navbarLink}><FontAwesomeIcon fontWeight={"light"} icon={faCaretRight}/> <FontAwesomeIcon icon={faGear}/> Settings</div>
            <div className={styles.logoutDiv} onClick={logout}>
                <span className={styles.logOutButton}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/></span>
            </div>
        </div>
    )
}

export default Navbar