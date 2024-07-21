import { FileUploadIcon } from "@/components/icons";
import FileItem from "@/components/ui/file-item";
import { DragAndDropZoneProps } from "@/types/componets-types";
import { useDropzone } from "react-dropzone";

const DragAndDropZone = ({ accept, maxSize, maxFiles, subDescription, className, files, onDrop, deleteFile }: DragAndDropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    maxFiles,
    onDrop,
  });

  const action = async () => {
    console.log("File: ", files);
  };

  return (
    <>
      <form action={action}>
        <div {...getRootProps()} className={className}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <FileUploadIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            {isDragActive ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Suelte</span> los archivos aqui...
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Haga click</span> o arrastre y suelte aqui...
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400">{subDescription}</p>
          </div>
        </div>
      </form>
      {files!.length > 0 && (
        <div className="max-h-[400px] overflow-y-scroll flex flex-col space-y-2 no-scrollbar">
          {files!.map((file, index) => (
            <FileItem key={index} deleteFile={deleteFile} index={index} fileName={file.name} fileSize={file.size} />
          ))}
        </div>
      )}
    </>
  );
};

export default DragAndDropZone;
