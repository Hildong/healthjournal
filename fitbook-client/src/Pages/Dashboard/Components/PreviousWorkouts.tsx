import { Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { IWorkouts } from "../../../@types/types";
  
const columns: ColumnsType<IWorkouts> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Muscle group(s)',
      key: 'muscleGroup',
      dataIndex: 'muscleGroup',
      render: (_, { muscleGroup }) => (
        <>
          {muscleGroup.map((muscleGroup) => {
            let color = 'geekblue'
            return (
              <Tag color={color} key={muscleGroup}>
                {muscleGroup.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
        title: 'Duration',
        dataIndex: 'length',
        key: 'length'
    },
    {
        title: 'PB',
        dataIndex: 'pb',
        key: 'pb',
        render: (text) => text ? <p>Yes</p> : <p>No</p>
    },
    {
        title: 'PB Exercise',
        dataIndex: 'pbExercise',
        key: 'pbExercise'
    },
    {
        title: 'PB weight/length',
        dataIndex: 'pbWeightOrLength',
        key: 'pbWeightOrLength'
    },
];
  
interface PreviousWorkoutsProps {
    workoutData?: IWorkouts[]
}

const PreviousWorkouts = ({workoutData} : PreviousWorkoutsProps) => {
    return (
        <div>
            <Table columns={columns} dataSource={workoutData} />
        </div>
    )
}

export default PreviousWorkouts