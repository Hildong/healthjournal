import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import useGetUsersWorkouts from './Hooks/useGetUsersWorkouts'
import Styles from './Styles/dashboard.module.css'
import {useQueryLoader} from '../../Components/LoadingComponent'
import PreviousWorkouts from './Components/PreviousWorkouts';
import { Divider } from 'antd';
import DashboardChart from './Components/DashboardChart';

const Dashboard = () => {
    const {activeUser} = useUserContext()
    const {setLoadingState} = useQueryLoader()
    const {data, status} = useGetUsersWorkouts(activeUser?._id);

    useEffect(() => {
        setLoadingState("loading")
    }, [data])
    
    return (
        <div style={{display: "flex"}}>
            <div className={Styles.graphsDiv}>
                <h3 style={{fontWeight: 400}}>Health status</h3>
                <Divider />
                <DashboardChart />
            </div>
            <div className={Styles.previousWorkoutsDiv}>
                <h3 style={{fontWeight: 400}}>Previous workouts</h3>
                <Divider />
                <PreviousWorkouts workoutData={data?.workouts}/>
            </div>
        </div>
    )
}

export default Dashboard