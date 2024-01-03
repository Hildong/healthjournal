import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import useGetUsersWorkoutsInPeriod from '../Hooks/useGetUsersWorkoutsInPeriod';
import { useUserContext } from '../../../context/UserContext';
import { useEffect, useState } from 'react';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        ticks: {
            stepSize: 20,
            maxTicksLimit: 100 as number
        },
        suggestedMin: 0,
        suggestedMax: 100
      },
    },
  };

const DashboardChart = () => {
    const {activeUser} = useUserContext()
    const {data, status} = useGetUsersWorkoutsInPeriod(activeUser?._id, 2)
    const [strength, setStrength] = useState<number>(0)
    const [cardio, setCardio] = useState<number>(0)
    const [development, setDevelopment] = useState<number>(0)
    const [diet, setDiet] = useState<number>(0)

    useEffect(() => {
        setStrength(0)
        setCardio(0)
        setDevelopment(0)
        data?.workouts.forEach(workoutData => {
            setStrength(prevStrength => prevStrength + (workoutData.type === "Strength" ? 3 : 0));
            setCardio(prevCardio => prevCardio + (workoutData.type === "Cardio" ? 3 : 0));
            setDevelopment(prevDevelopment => prevDevelopment + (workoutData.pb ? 10 : 0));
        });
    }, [data])
    
    const RadarData = {
        labels: ["Strength", "Cardio", "Diet", "Development"],
        datasets: [
          {
            label: "Data from last 2 months",
            backgroundColor: "rgba(34, 202, 236, .2)",
            borderColor: "rgba(34, 202, 236, 1)",
            pointBackgroundColor: "rgba(34, 202, 236, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(34, 202, 236, 1)",
            data: [strength, cardio, diet, development]
          }
        ]
    };

    return (
        <div>
            <Radar data={RadarData} options={RadarOptions}/>
        </div>
    )
}

export default DashboardChart