import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormInputProps {
    id: string;
    label: string;

}
export const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
}) => {
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
                    
                />
            </div>
        </div>
    )
}