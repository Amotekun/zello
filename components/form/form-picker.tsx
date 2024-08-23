import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

interface FormPickerProps {
    id: string;
    name: string;
    control: any;
};

export const FormPicker: React.FC<FormPickerProps> = ({
    id,
    name,
    control
}) => {
    const {field} = useController({
        control,
        name
    })
    const [images, setImages] = useState<Array<Record<string, any>>>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(field.value || null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                });

                if (result && result.response) {
                    const newImages = result.response as Array<Record<string, any>>;
                    setImages(newImages)
                } else {
                    console.error("Unable to fetch images");
                }
            } catch (error) {
                console.log(error);
                setImages([])
            } finally {
                setIsLoading(false);
            }
        }

        fetchImages();
    }, [])

    const handleSelectImage = (image: Record<string, any>) => {
        setSelectedImage(image.id);

        field.onChange(
            `
            ${image.id} |
            ${image.urls.thumb} |
            ${image.urls.full} |
            ${image.user.name} |
            ${image.links.html}
            `
        );

        console.log("SELECTED IMAGE:", image.id, image.urls.thumb, image.urls.full, image.user.name, image.links.html);
    };

    if(isLoading) {
        <div className="">
            <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-2 mb-3">
                {images?.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",

                        )}
                        onClick={() => {
                            if (selectedImage !== image.id) {
                                handleSelectImage(image);
                            }
                        }}
                    >
                        <Image 
                            src={image.urls.thumb}
                            alt="Thumbnail"
                            className="object-cover rounded-sm"
                            fill
                        />
                        {selectedImage === image.id && (
                            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white"/>
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="absolute opacity-0 hover:opacity-100 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};