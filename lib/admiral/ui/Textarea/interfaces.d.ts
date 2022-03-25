import { TextareaAutosizeProps } from 'react-textarea-autosize'
export declare type TextareaSizeType = 'XS' | 'S' | 'M' | 'L'
export interface TextareaProps extends TextareaAutosizeProps {
    size?: TextareaSizeType
    borderless?: boolean
    alert?: boolean
}
