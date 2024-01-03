import { message } from "antd";

interface ErrorValidationProps {
    errorMessage: String
}

const ErrorValidation = ({errorMessage}: ErrorValidationProps) => {
    const [messageApi, contextHolder] = message.useMessage();

    messageApi.open({
        type: "error",
        content: errorMessage
    })
}

export default ErrorValidation