import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { forwardRef } from "react";

interface FormInputProps {
    id: string;
    name: string;
    label?: string;
    onBlur?: () => void;
    defaultValue?: string;
    className?: string;

};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    name,
    onBlur,
    defaultValue,
    className,
}, ref) => {
    return (
        <div>
            <div>
                {label ? (
                    <Label
                        htmlFor={id}
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {label}
                    </Label>
                ): null}
                <Input 
                    id={id}
                    name="title"
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    className={className}
                />
            </div>
        </div>
    )
});



