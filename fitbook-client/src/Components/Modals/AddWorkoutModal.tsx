import { Checkbox, Input, Modal, Select, message } from "antd"
import styles from '../style/addWorkOut.module.css'
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IWorkouts } from "../../@types/types";
import useAddWorkout from "../hooks/useAddWorkout";
import { useUserContext } from "../../context/UserContext";

interface AddWorkoutModalProps {
    open: boolean;
    closeModal: () => void
}

const AddWorkoutModal = ({open, closeModal}: AddWorkoutModalProps) => {
    const { setValue, handleSubmit} = useForm<IWorkouts>()
    const [pb, setPB] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage();
    const {activeUser} = useUserContext()
    const addWorkout = useAddWorkout()

    const handleTypeChange = (value: string) => {
        setValue("type", value)
    };

    const handleMuscleGroupChange = (value: string[]) => {
        setValue("muscleGroup", value)
    };

    const handlePBChange = (value: boolean) => {
        setPB(value)
        setValue("pb", value)
    }

    const onSubmit: SubmitHandler<IWorkouts> = (data: IWorkouts) => {
        if(!data.type) {
            messageApi.open({
                type: "error",
                content: "Please fill in a type (Strength or Cardio training)"
            })
        } else if(activeUser?._id) {
            console.log(data)
            addWorkout.mutateAsync({workout: data, userID: activeUser?._id})
                .then(res => {
                    if(res.status === 201) {
                        closeModal()
                        messageApi.open({
                            type: "success",
                            content: "Workout saved successfully!"
                        })
                    }
                })
                .catch(err => {
                    if(err) {
                        messageApi.open({
                            type: "error",
                            content: "There was an error with saving workout"
                        })
                    }
                })
        }
    }

    return (
        <div>
            {contextHolder}
            <Modal
                open={open}
                onCancel={closeModal}
                title="Add workout"
                onOk={handleSubmit(onSubmit)}
            >
                <div className={styles.modalForm}>
                    <label>Type: </label>
                    <Select
                        style={{ width: 300 }}
                        onChange={handleTypeChange}
                        options={[
                            { value: 'Strength', label: 'Strength' },
                            { value: 'Cardio', label: 'Cardio' },
                        ]}
                    />
                    <label>Muscle groups: </label>
                    <Select
                        mode="multiple"
                        style={{ width: 300 }}
                        onChange={handleMuscleGroupChange}
                        options={[
                            { value: 'Abs', label: 'Abs' },
                            { value: 'Back', label: 'Back' },
                            { value: 'Chest', label: 'Chest' },
                            { value: 'Forearms', label: 'Forearms'},
                            { value: 'Glutes', label: 'Glutes'},
                            { value: 'Hamstrings', label: 'Hamstrings'},
                            { value: 'Legs', label: 'Legs'},
                            { value: 'Neck', label: 'Neck'},
                            { value: 'Shoulders', label: 'Shoulders'},
                            { value: 'Traps', label: 'Traps'},
                            { value: 'Triceps', label: 'Triceps'},
                        ]}
                    />
                    <label>Duration: </label>
                    <Input style={{ width: 300 }} onChange={e => setValue("length", e.target.valueAsNumber)} type="number" placeholder="x Minutes..."/>
                    <label>PB?: </label>
                    <Checkbox onChange={e => handlePBChange(e.target.checked)}/>
                    <label style={pb ? {display: "inline-block"} : {display: "none"}}>PB Exercise: </label>
                    <Input onChange={e => setValue("pbExercise", e.target.value)} style={pb ? {display: "inline-block", width: 300} : {display: "none"}}/>
                    <label style={pb ? {display: "inline-block"} : {display: "none"}}>PB weight/length: </label>
                    <Input onChange={e => setValue("pbWeightOrLength", e.target.value)} style={pb ? {display: "inline-block", width: 300} : {display: "none"}}/>
                </div>
            </Modal>
        </div>
    )
}

export default AddWorkoutModal