import { useState } from "react";
import api from "../lib/api";

interface ImageUploadProps {
    onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);

        uploadImage(selectedFile);
    }


    async function uploadImage(selectedFile: File) {
        const formData = new FormData();

        formData.append("image", selectedFile);

        try {
            setLoading(true);

            const response = await api.post("/upload", formData);

            setImageUrl(response.data.imageUrl);
            onUpload(response.data.imageUrl);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col gap-5">

            <div>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <label
                    htmlFor="image"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        bg-yellow-400
                        text-black
                        rounded-full
                        px-5
                        py-2
                        font-medium
                        cursor-pointer
                        hover:bg-yellow-300
                        transition-colors
                    "
                >
                    {loading ? "Uploading..." : "Choose Image"}
                </label>


                {file && (
                    <p className="text-sm text-neutral-500 mt-3">
                        {file.name}
                    </p>
                )}
            </div>


            {preview && (
                <div>
                    <p className="text-sm text-neutral-500 mb-2">
                        Preview:
                    </p>

                    <img
                        src={preview}
                        alt="preview"
                        className="
                            w-64
                            h-64
                            rounded-2xl
                            object-cover
                        "
                    />
                </div>
            )}


            {imageUrl && (
                <div>
                    <p className="text-sm text-neutral-500 mb-2">
                        Uploaded:
                    </p>

                    <img
                        src={imageUrl}
                        alt="uploaded"
                        className="
                            w-64
                            h-64
                            rounded-2xl
                            object-cover
                        "
                    />
                </div>
            )}

        </div>
    );
}